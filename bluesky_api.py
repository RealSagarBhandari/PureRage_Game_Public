import requests
import os
from dotenv import load_dotenv

# If the app is deployed on local machine
if "WEBSITE_HOSTNAME" not in os.environ:
    # Development
    load_dotenv(".secret.env")
# Following are used to interact with bluesky API
# Following are used to interact with bluesky API
BLUESKY_HANDLE = os.environ.get("BLUESKY_HANDLE", "MOCK")
BLUESKY_APP_PASSWORD = os.environ.get("BLUESKY_APP_PASSWORD", "MOCK")
HASHTAG = "PureRage"
FETCH_LIMIT = 5
PDS_URL = "https://bsky.social"

def _create_session_jwt():
    """
    Create a session with the Bluesky PDS and return an access JWT.

    Returns:
        str: A JSON Web Token (JWT) for authenticating Bluesky API requests.
    """
    url = f"{PDS_URL}/xrpc/com.atproto.server.createSession"
    resp = requests.post(
        url,
        json={
            "identifier": BLUESKY_HANDLE,
            "password":   BLUESKY_APP_PASSWORD,
        },
    )
    resp.raise_for_status()
    return resp.json()["accessJwt"]


def fetch_recent_bluesky_posts():
    """
    Fetch recent Bluesky posts containing the configured hashtag.

    Logs into the PDS, searches for posts matching #HASHTAG,
    and returns up to FETCH_LIMIT posts.

    Returns:
        list of dict: A list of post-view dictionaries with keys such as:
            - author (dict with 'handle')
            - record (dict with 'text', etc.)
            - indexedAt (str timestamp)
    """
    if BLUESKY_HANDLE == "MOCK":
        return []
        
    try:
        jwt = _create_session_jwt()
        url = f"{PDS_URL}/xrpc/app.bsky.feed.searchPosts"
        headers = {"Authorization": f"Bearer {jwt}"}
        params = {
            "q":     f"#{HASHTAG}",
            "limit": FETCH_LIMIT,
        }
        resp = requests.get(url, headers=headers, params=params)
        resp.raise_for_status()
        return resp.json().get("posts", [])
    except Exception:
        return []
