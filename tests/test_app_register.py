import pytest
from unittest.mock import MagicMock

import app

@pytest.mark.parametrize("payload,missing_field", [
    ({"username": "foo", "password": "bar"}, "displayName"),
    ({"password": "bar", "displayName": "Foo"}, "username"),
    ({"username": "foo", "displayName": "Foo"}, "password"),
])


def test_register_missing_fields(client, payload, missing_field):
    """Should return 400 if any required field is missing."""
    resp = client.post("/register", json=payload)
    assert resp.status_code == 400
    data = resp.get_json()
    assert f"Missing required field: {missing_field}" in data["message"]


def test_register_password_too_short(client):
    """Should return 400 when password length is below minimum."""
    payload = {
        "username": "user1",
        "password": "short",
        "displayName": "Name"
    }
    resp = client.post("/register", json=payload)
    assert resp.status_code == 400
    data = resp.get_json()
    assert f"Password must be at least {app.MIN_PASSWORD_LENGTH} characters" in data["message"]


def test_register_empty_display_name(client):
    """Should return 400 if displayName is empty."""
    payload = {
        "username": "user1",
        "password": "longenough",
        "displayName": ""
    }
    resp = client.post("/register", json=payload)
    assert resp.status_code == 400
    data = resp.get_json()
    assert "Display name cannot be empty" in data["message"]


def test_register_invalid_username(client, monkeypatch):
    """Should return 400 if username contains non-alphanumeric characters."""
    mock_cursor = MagicMock()
    mock_conn = MagicMock()
    mock_conn.__enter__.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor
    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)

    payload = {
        "username": "bad!user",
        "password": "longenough",
        "displayName": "Name"
    }
    resp = client.post("/register", json=payload)
    assert resp.status_code == 400
    data = resp.get_json()
    assert "Username must be alphanumeric" in data["message"]


def test_register_success(client, monkeypatch):
    """Should create a new user and return 201 on success."""
    mock_cursor = MagicMock()
    mock_cursor.execute.return_value.fetchone.return_value = None
    mock_cursor.commit = MagicMock()

    mock_conn = MagicMock()
    mock_conn.__enter__.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor

    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)
    monkeypatch.setattr(app.flask_bcrypt, "generate_password_hash", lambda pw: b"hashedpwd")

    payload = {
        "username": "newuser",
        "password": "securepassword",
        "displayName": "New User"
    }
    resp = client.post("/register", json=payload)
    assert resp.status_code == 201

    data = resp.get_json()
    assert data["message"] == "User created successfully"
    assert data["displayName"] == "New User"

    mock_cursor.execute.assert_any_call(
        "INSERT INTO Users (username, password, display_name) VALUES (?, ?, ?)",
        ("newuser", "hashedpwd", "New User")
    )
    mock_cursor.commit.assert_called_once()


def test_register_db_error_on_insert(client, monkeypatch):
    """Should return 500 if database insert fails."""
    from pyodbc import Error

    def exec_side_effect(sql, params):
        if sql.startswith("INSERT INTO Users"):
            raise Error("boom")
        return MagicMock(fetchone=lambda: None)

    mock_cursor = MagicMock()
    mock_cursor.execute.side_effect = exec_side_effect
    mock_cursor.commit = MagicMock()

    mock_conn = MagicMock()
    mock_conn.__enter__.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor

    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)
    monkeypatch.setattr(app.flask_bcrypt, "generate_password_hash", lambda pw: b"hashedpwd")

    payload = {
        "username": "newuser",
        "password": "securepassword",
        "displayName": "New User"
    }
    resp = client.post("/register", json=payload)
    assert resp.status_code == 500
    data = resp.get_json()
    assert data["message"] == "An error occurred while creating the user"
