from unittest.mock import MagicMock
import pyodbc
from datetime import datetime

import app

BAD_LOGIN_MESSAGE = app.BAD_LOGIN_MESSAGE


def make_conn_with_cursor(mock_cursor):
    """
    Helper: wrap a MagicMock cursor in a context-manager connection
    """
    conn = MagicMock()
    conn.__enter__.return_value = conn
    conn.__exit__.return_value = None
    conn.cursor.return_value = mock_cursor
    return conn


def test_login_internal_error(client, monkeypatch):
    """Simulate a DB error on user lookup, expect a 500."""
    # Create a cursor that raises on execute
    fake_cursor = MagicMock()
    fake_cursor.execute.side_effect = pyodbc.Error("db error")
    mock_conn = make_conn_with_cursor(fake_cursor)
    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)

    resp = client.post("/login", json={"username": "u", "password": "p"})
    assert resp.status_code == 500
    assert resp.get_json()["message"] == "An internal error has occured"


def test_login_invalid_user(client, monkeypatch):
    """No user in DB >> 400 + bad-login message."""
    # Cursor.fetchone() returns None
    mock_cursor = MagicMock()
    mock_cursor.execute.return_value.fetchone.return_value = None
    mock_conn = make_conn_with_cursor(mock_cursor)
    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)

    resp = client.post("/login", json={"username": "noone", "password": "pw"})
    assert resp.status_code == 400
    assert BAD_LOGIN_MESSAGE in resp.get_json()["message"]


def test_login_invalid_password(client, monkeypatch):
    """User exists but wrong password >> 400 + bad-login message."""
    # Fake user row
    user = MagicMock(password="hashedpw")
    mock_cursor = MagicMock()
    mock_cursor.execute.return_value.fetchone.return_value = user
    mock_conn = make_conn_with_cursor(mock_cursor)
    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)
    # Force password check to return False
    monkeypatch.setattr(app.flask_bcrypt, "check_password_hash", lambda h, p: False)

    resp = client.post("/login", json={"username": "u", "password": "wrong"})
    assert resp.status_code == 400
    assert BAD_LOGIN_MESSAGE in resp.get_json()["message"]


def test_login_success(client, monkeypatch):
    """Valid credentials >> 200 + displayName/lastLogin + sessionID cookie."""
    last_login = datetime(2025, 5, 1, 12, 0, 0)
    user = MagicMock(password="hpw", display_name="Test User", last_login=last_login)

    mock_cursor = MagicMock()
    mock_cursor.execute.return_value.fetchone.return_value = user
    mock_conn = make_conn_with_cursor(mock_cursor)
    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)

    # Stub out bcrypt and session helpers
    monkeypatch.setattr(app.flask_bcrypt, "check_password_hash", lambda h, p: True)
    monkeypatch.setattr(app, "create_session", lambda u, c: "sess123")
    monkeypatch.setattr(app, "sign_session_cookie", lambda sid: "signedcookie")

    resp = client.post("/login", json={"username": "u", "password": "right"})
    assert resp.status_code == 200

    data = resp.get_json()
    assert data["displayName"] == "Test User"
    assert data["lastLogin"] == last_login.isoformat()

    sc = resp.headers.get("Set-Cookie", "")
    assert "sessionID=signedcookie" in sc
    assert f"Max-Age={app.SESSION_EXPIRY_SECONDS}" in sc
