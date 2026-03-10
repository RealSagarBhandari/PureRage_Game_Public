import pytest
import requests
from unittest.mock import MagicMock

import bluesky_api


def test__create_session_jwt_success(monkeypatch):
    """_create_session_jwt should return the accessJwt from the JSON payload."""
    fake_resp = MagicMock()
    fake_resp.raise_for_status.return_value = None
    fake_resp.json.return_value = {"accessJwt": "my.jwt.token"}

    monkeypatch.setattr(bluesky_api.requests, "post", lambda url, json: fake_resp)

    jwt = bluesky_api._create_session_jwt()
    assert jwt == "my.jwt.token"


def test__create_session_jwt_http_error(monkeypatch):
    """_create_session_jwt should propagate HTTPError if raise_for_status fails."""
    class FakeResp:
        def raise_for_status(self):
            raise requests.HTTPError("auth failed")

    monkeypatch.setattr(bluesky_api.requests, "post", lambda url, json: FakeResp())

    with pytest.raises(requests.HTTPError):
        bluesky_api._create_session_jwt()


def test_fetch_recent_bluesky_posts_success(monkeypatch):
    """fetch_recent_bluesky_posts should return the list of posts when the GET succeeds."""
    # Stub out the JWT creation
    monkeypatch.setattr(bluesky_api, "_create_session_jwt", lambda: "jwt-token")

    fake_resp = MagicMock()
    fake_resp.raise_for_status.return_value = None
    fake_resp.json.return_value = {
        "posts": [
            {"record": {"text": "first post"}},
            {"record": {"text": "second post"}},
        ]
    }

    def fake_get(url, headers, params):
        # verify we pass the right auth header and params
        assert headers == {"Authorization": "Bearer jwt-token"}
        assert params["q"] == f"#{bluesky_api.HASHTAG}"
        assert params["limit"] == bluesky_api.FETCH_LIMIT
        return fake_resp

    monkeypatch.setattr(bluesky_api.requests, "get", fake_get)

    posts = bluesky_api.fetch_recent_bluesky_posts()
    assert isinstance(posts, list)
    assert posts[0]["record"]["text"] == "first post"
    assert posts[1]["record"]["text"] == "second post"


def test_fetch_recent_bluesky_posts_http_error(monkeypatch):
    """fetch_recent_bluesky_posts should propagate HTTPError if the GET fails."""
    monkeypatch.setattr(bluesky_api, "_create_session_jwt", lambda: "jwt-token")

    class FakeResp2:
        def raise_for_status(self):
            raise requests.HTTPError("fetch failed")

    monkeypatch.setattr(bluesky_api.requests, "get", lambda url, headers, params: FakeResp2())

    with pytest.raises(requests.HTTPError):
        bluesky_api.fetch_recent_bluesky_posts()