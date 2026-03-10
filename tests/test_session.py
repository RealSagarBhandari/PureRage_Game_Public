from unittest.mock import MagicMock
from datetime import datetime, timedelta

import app

def test_sign_and_verify_session_cookie():
    """A session ID signed and then verified should round-trip."""
    session_id = "test-session-123"
    signed = app.sign_session_cookie(session_id)
    assert app.verify_session_cookie_signature(signed) == session_id

def test_delete_session_success(monkeypatch):
    """delete_session returns True on successful DELETE."""
    mock_cursor = MagicMock()
    result = app.delete_session("sess123", mock_cursor)
    assert result is True
    mock_cursor.execute.assert_called_once_with(
        "DELETE FROM Sessions WHERE sessionid = ?", ("sess123",)
    )


def test_delete_session_failure(monkeypatch):
    """delete_session returns False if the DB deletion errors."""
    from pyodbc import Error
    mock_cursor = MagicMock()
    mock_cursor.execute.side_effect = Error("oops")
    assert app.delete_session("sess123", mock_cursor) is False


def test_get_user_from_session_no_cookie(monkeypatch):
    """If cookie signature fails, returns None."""
    monkeypatch.setattr(app, "verify_session_cookie_signature", lambda c: None)
    assert app.get_user_from_session("anycookie") is None

def make_conn_with_cursor(mock_cursor):
    """
    Helper to create a MagicMock connection that properly implements:
      with get_db_connection() as conn:
          cursor = conn.cursor()
    """
    mock_conn = MagicMock()
    # `with mock_conn as conn:` will bind `conn = mock_conn.__enter__()`
    mock_conn.__enter__.return_value = mock_conn
    mock_conn.__exit__.return_value = None
    mock_conn.cursor.return_value = mock_cursor
    return mock_conn


def test_get_user_from_session_not_found(monkeypatch):
    """Valid signature but no session row → None."""
    monkeypatch.setattr(app, "verify_session_cookie_signature", lambda c: "sessid")

    # Cursor.execute(...).fetchone() → None
    mock_cursor = MagicMock()
    mock_cursor.execute.return_value.fetchone.return_value = None

    # Wrap it in a context‐manager conn
    mock_conn = make_conn_with_cursor(mock_cursor)
    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)

    assert app.get_user_from_session("signed") is None


def test_get_user_from_session_expired(monkeypatch):
    """Session row exists but expiry is in the past → 'expired'."""
    monkeypatch.setattr(app, "verify_session_cookie_signature", lambda c: "sessid")

    past = datetime.now() - timedelta(days=1)
    session_row = MagicMock(expiry=past)

    # Cursor.execute(...).fetchone() → session_row
    mock_cursor = MagicMock()
    mock_cursor.execute.return_value.fetchone.return_value = session_row

    mock_conn = make_conn_with_cursor(mock_cursor)
    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)

    assert app.get_user_from_session("signed") == "expired"


def test_get_user_from_session_valid(monkeypatch):
    """Valid session and unexpired → returns user row."""
    monkeypatch.setattr(app, "verify_session_cookie_signature", lambda c: "sessid")

    future = datetime.now() + timedelta(days=1)
    session_row = MagicMock(expiry=future)
    user_row = MagicMock(display_name="Alice", last_login=future)

    # We need two sequential fetchones:
    seq = [
        MagicMock(fetchone=lambda: session_row),  # first call for session
        MagicMock(fetchone=lambda: user_row),     # second call for user
    ]
    mock_cursor = MagicMock()
    mock_cursor.execute.side_effect = lambda *args, **kwargs: seq.pop(0)

    mock_conn = make_conn_with_cursor(mock_cursor)
    monkeypatch.setattr(app, "get_db_connection", lambda: mock_conn)

    result = app.get_user_from_session("signed")
    assert result.display_name == "Alice"
    assert result.last_login == future