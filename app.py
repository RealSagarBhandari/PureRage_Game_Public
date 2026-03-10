from flask import (
    Flask, render_template, make_response, 
    abort
)
from flask_restful import Api, request, Resource
from flask_bcrypt import Bcrypt
from datetime import datetime
from dotenv import load_dotenv
try:
    import pyodbc
except ImportError:
    pyodbc = None
import os
import hmac
import hashlib

from bluesky_api import fetch_recent_bluesky_posts

# --- MOCK MODE SETUP ---
# Simple mock classes to allow the app to run without a real database
class MockCursor:
    def execute(self, *args, **kwargs): return self
    def fetchone(self): 
        # Mock user for testing
        class User:
            password = "$2b$12$Kjh8f...mock..." # Not real
            display_name = "PureRager"
            last_login = datetime.now()
            create_date = datetime.now()
            userid = "12345"
            sessionid = "mock-session"
            expiry = datetime.now()
        return User()
    def close(self): pass
    def commit(self): pass

class MockConnection:
    def cursor(self): return MockCursor()
    def commit(self): pass
    def __enter__(self): return self
    def __exit__(self, *args): pass

# Constants
MAX_USERNAME_LENGTH = 50
MIN_PASSWORD_LENGTH = 8
SESSION_EXPIRY_SECONDS = 60 * 60 * 24 * 7
BAD_LOGIN_MESSAGE = "Invalid Username or Password, try again."

# Load environment variable if we're in development.
# Azure will always set the "WEBSITE_HOSTNAME" environment variable when running
# So we can use its presence to determine if we are on awa
# If we are not on awa, then we need to load the .secret.env file
if "WEBSITE_HOSTNAME" not in os.environ:
    # Development
    load_dotenv(".secret.env")

# Load the connection string from the environment variable.
# If missing or set to a placeholder, we default to "MOCK" to trigger mock mode
CONNECTION_STRING = os.environ.get("AZURE_SQL_CONNECTIONSTRING", "MOCK")
if "YOUR_SERVER" in CONNECTION_STRING or pyodbc is None:
    CONNECTION_STRING = "MOCK"

APP_SECRET = os.environ.get("FLASK_SECRET_KEY", "pure-rage-secret-123")


# Initialize the flask app here
app = Flask(
    __name__,
    template_folder="public",       # Use public folder for templates
    static_folder=".",              # serve static files from root directory
    static_url_path=""              # so `/css/style.css` just works as-is
)

# Initialize bcrypt for hashing passwords
flask_bcrypt = Bcrypt(app)
# Initialize the api
api = Api(app)

# This is a decorator function that we can use to easily add a resource at a specific route.
# Decorators are powerful!
def addResource(route: str):
    """Adds a resource to the API at the specified route"""

    def wrapper(cls, *args, **kwargs):
        api.add_resource(cls, route, *args, **kwargs)
        return cls

    return wrapper

# Decorator function that requires a user to be logged in to access a specific page
def require_login(fn):
    def wrapper(*args, **kwargs):
        if CONNECTION_STRING == "MOCK":
            return fn(*args, **kwargs)
        session_id = request.cookies.get("sessionID")
        if not session_id:
            abort(401)
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
              "SELECT 1 FROM Sessions WHERE sessionid = ? AND expiry > GETDATE()",
              (session_id,)
            )
            if not cursor.fetchone():
                abort(401)   # no valid session
        return fn(*args, **kwargs)
    return wrapper

# Database connection setup
def get_db_connection():
    if CONNECTION_STRING == "MOCK" or pyodbc is None:
        return MockConnection()
    try:
        connection = pyodbc.connect(CONNECTION_STRING)
        return connection
    except Exception:
        return MockConnection()

def sign_session_cookie(session_id: str) -> str:
    """Sign the session ID with the app secret"""
    signature = hmac.new(
        APP_SECRET.encode(), session_id.encode(), hashlib.sha256
    ).hexdigest()
    return f"{session_id}:{signature}"

def verify_session_cookie_signature(cookie: str) -> str | None:
    """Verify the session cookie signature and return the session ID if valid"""
    try:
        session_id, signature = cookie.split(":")
        expected_signature = hmac.new(
            APP_SECRET.encode(), session_id.encode(), hashlib.sha256
        ).hexdigest()
        if hmac.compare_digest(signature, expected_signature):
            return session_id
    except (ValueError, AttributeError):
        pass
    return None

def delete_session(session_id: str, cursor) -> bool:
    """Delete the session from the database, returning True if successful."""
    try:
        cursor.execute("DELETE FROM Sessions WHERE sessionid = ?", (session_id,))
    except Exception:
        return False
    return True

def validate_username(username: str, db_cursor) -> tuple[bool, str]:
    """Validate the password to ensure it meets the requirements

    A username must be alphanumeric and at most 50 characters long.
    It must also not already exist in the database.

    @param username: The username to validate
    @param db_cursor: The cursor to the database
    @return: A tuple containing a boolean indicating if the username is valid and \
        an invalidation message if it is not (otherwise the empty string)
    """
    if not username.isalnum():
        return False, "Username must be alphanumeric"
    elif len(username) > MAX_USERNAME_LENGTH:
        return False, "Username must be at most 20 characters long"
    elif db_cursor.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone():
        return False, "Username already exists"
    return True, ""


def validate_password(password: str) -> tuple[bool, str]:
    """Validate the password to ensure it meets the requirements"

    @param password: The password to validate
    @return: A tuple containing a boolean indicating if the password is valid and \
        an invalidation message if it is not (otherwise the empty string)
    """
    if len(password) < MIN_PASSWORD_LENGTH:
        return False, f"Password must be at least {MIN_PASSWORD_LENGTH} characters long"
    return True, ""

# Now, we use the "addResource" decorator to add a resource at the "/register" route
# This is shorthand for calling "api.add_resource(Register, "/register")"
@addResource("/register")
class Register(Resource):
    def post(self):
        data = request.get_json()

        for key in ["username", "password", "displayName"]:
            if key not in data:
                return {"message": f"Missing required field: {key}"}, 400

        username = data.get("username")
        password = data.get("password")
        display_name = data.get("displayName")

        print("Recieving request: ", data)

        # Validate the password
        success, message = validate_password(password)
        if not success:
            return {"message": message}, 400

        # Validate the display name:

        if not display_name:
            return {"message": "Display name cannot be empty"}, 400

        # Save the user to the database

        # We use a context manager to ensure the connection is closed when we're done
        with get_db_connection() as conn:
            # A cursor grabs is an object that allows you to interact with the database.
            cursor = conn.cursor()

            # We made a function to validate the username to keep this code clean
            # check if the username already exists
            success, message = validate_username(username, cursor)
            if not success:
                return {"message": message}, 400

            # Hash the password. Do this after username checks to avoid unnecessary work
            hashed_password = flask_bcrypt.generate_password_hash(password).decode("utf-8")

            try:
                # This uses parameterized queries to avoid SQL injection
                # the ? is a placeholder that gets replaced by the values in the tuple
                cursor.execute(
                    "INSERT INTO Users (username, password, display_name) VALUES (?, ?, ?)",
                    (username, hashed_password, display_name),
                )
                cursor.commit()
            except Exception:
                return {"message": "An error occurred while creating the user"}, 500
            finally:
                # We need to close the cursor to release the connection
                # Important to do this in a finally block to ensure it always happens regardless of the outcome
                cursor.close()

            return {"message": "User created successfully", "displayName": display_name}, 201
        
@addResource("/login")
class Login(Resource):
    def post(self):
        # login information may be sent in body or header.
        # let's assume that it is sent for body in the login endpoint.
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        if CONNECTION_STRING == "MOCK":
            # In mock mode, we accept any login
            response = make_response(
                {
                    "displayName": "PureRager",
                    "lastLogin": datetime.now().isoformat(),
                },
                200,
            )
            # Create a mock signed cookie
            session_cookie = sign_session_cookie("mock-session")
            response.set_cookie(
                "sessionID",
                samesite="Strict",
                value=session_cookie,
                max_age=SESSION_EXPIRY_SECONDS,
            )
            return response

        # Check if the username and password match.
        with get_db_connection() as conn:
            # A cursor grabs is an object that allows you to interact with the database.
            cursor = conn.cursor()

            try:
                user = cursor.execute(
                    "SELECT * FROM Users WHERE username = ?", (username,)
                ).fetchone()
            except Exception:
                return {"message": "An internal error has occured"}, 500

            # `user is None` checks if the user exists.
            # check_password_hash checks to see if the passwords match
            if user is None or not flask_bcrypt.check_password_hash(
                user.password, password
            ):
                return {"message": BAD_LOGIN_MESSAGE}, 400

            # Update the last login time
            update_login_time(conn, username)

            # get a session id
            session_id = create_session(username, cursor)
            # sign the session id
            session_cookie = sign_session_cookie(session_id)

            cursor.commit()
            cursor.close()

            response = make_response(
                {
                    "displayName": user.display_name,
                    "lastLogin": (user.last_login or user.create_date).isoformat(),
                },
                200,
            )
            response.set_cookie(
                "sessionID",
                samesite="Strict",
                value=session_cookie,
                max_age=SESSION_EXPIRY_SECONDS,
            )

            return response

def update_login_time(cursor, username):
    try:
        cursor.execute(
            "UPDATE Users SET last_login = ? WHERE username = ?",
            (datetime.now(), username),
        )
    except Exception:
        return False
    return True

def create_session(username: str, cursor) -> str:
    """Create a new session for the user and return the session ID"""
    session_id = cursor.execute(
        """INSERT INTO Sessions (sessionid, userid, expiry)
                    OUTPUT INSERTED.sessionid
                    VALUES (
                        NEWID(), 
                        (SELECT userid FROM Users WHERE username = ?),
                        DATEADD(WEEK, 1, GETDATE())
                    );""",
        (username,),
    ).fetchone()
    return session_id[0]

def get_user_from_session(cookie):
    """Get the user from the session cookie.

    Returns:
        - None if session is invalid or not found.
        - "expired" if session exists but is expired.
        - user row (with display_name and last_login) if valid and not expired.
    """
    if CONNECTION_STRING == "MOCK":
        # In mock mode, we always return a valid user
        class MockUser:
            display_name = "PureRager"
            last_login = datetime.now()
        return MockUser()

    session_id = verify_session_cookie_signature(cookie)
    if session_id is None:
        return None
    
    with get_db_connection() as conn:
        cursor = conn.cursor()

        session = cursor.execute(
            "SELECT userid, expiry FROM Sessions WHERE sessionid = ?", (session_id,)
        ).fetchone()

        if session is None:
            return session  # session id not found in db
        
        expiry = session.expiry # expiration date of session
        if datetime.now() > expiry:
            # If session is expired, delete from database & return expired
            cursor.execute(
                "DELETE FROM Sessions WHERE sessionid = ?", (*session_id,)
            )
            conn.commit
            return "expired"

        user = cursor.execute(
            "SELECT display_name, last_login FROM Users WHERE userid = (SELECT userid FROM Sessions WHERE sessionid = ?)",
            (session_id,),
        ).fetchone()
        cursor.close()
    return user

# The "@app.route" decorator is sugar for calling app.add_url_rule
@app.route("/")
def index():
    return render_template("intro.html", name="Login")

@app.route("/signup")
def signup_form():
    return render_template("signup.html", name="Sign Up")

@app.route("/user_feedback")
def user_feedback():
    try:
        posts = fetch_recent_bluesky_posts()
    except Exception as e:
        app.logger.error(f"Bluesky fetch error: {e}")
        posts = []
    return render_template("user_feedback.html", posts=posts)

@addResource("/character_select")
class CharacterSelectEndpoint(Resource):
    def get(self):
        user = get_user_from_session(request.cookies.get("sessionID"))
        if user is None:
            return {"message": "Not authenticated"}, 401
        elif user == "expired":
            response = make_response({"message": "Session expired. Please log in again."}, 401)
            response.set_cookie("sessionID", value="", expires=0, samesite="Strict")
            return response
        return make_response(
            render_template("character_select.html", name="Character Select")
        )

@addResource("/battle")
class BattleEndpoint(Resource):
    def get(self):
        user = get_user_from_session(request.cookies.get("sessionID"))
        if user is None:
            print("user is none")
            return {"message": "Not authenticated"}, 401
        elif user == "expired":
            response = make_response({"message": "Session expired. Please log in again."}, 401)
            response.set_cookie("sessionID", value="", expires=0, samesite="Strict")
            return response
        return make_response(
            render_template("battle.html", name="Battle")
        )
    
@addResource("/logout")
class Logout(Resource):
    def post(self):
        # Get the session cookie from the request.
        # Note that cookies are sent automatically, so we don't have to change anything in the javascript code.
        session_cookie = request.cookies.get("sessionID")
        # If the sessionID doesn't exist in the header, then that means the cookie isn't set.
        # In that case, we should inform the user that they aren't logged in.
        if not session_cookie:
            return {"message": "Not logged in"}, 400
        # If it is set, then verify the session cookie signature. This will ensure that the
        # cookie they sent matches a cookie we sent them, and will resolve to the session id portion.
        session_id = verify_session_cookie_signature(session_cookie)
        # the verify_session_cookie_signature method returns None if verification wasn't successful.
        if session_id is None:
            return {"message": "Invalid session"}, 400


        # Now, we delete the session from the database.
        with get_db_connection() as conn:
            cursor = conn.cursor()
            if session_id is not None:
                delete_session(session_id, cursor)
            cursor.commit()
            cursor.close()

        response = make_response({"message": "Successfully logged out."}, 200)
        # Delete the cookie. Easiest way to do this is to set an empty cookie, and set the expiry
        # to some point in the past.
        response.set_cookie("sessionID", value="", expires=0, samesite="Strict")
        return response

if __name__ == "__main__":
    app.run(debug=True)