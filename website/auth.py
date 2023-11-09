
from flask import Blueprint, render_template, request, flash
import os
import pathlib

import requests
from flask import Flask, session, abort, redirect
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests

auth = Blueprint('auth', __name__)

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

ALLOWED_EMAILS= ['pharaoh@bu.edu','jleeds@bu.edu']

client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://127.0.0.1:5000/callback"
)

GOOGLE_CLIENT_ID = "632937425552-3vvmu79tsom382v7e4j5kqt57qd50l3u.apps.googleusercontent.com"

def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper


@auth.route('/home')
@login_is_required
def home():
    return render_template("home.html")

@auth.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    user_email = id_info.get("email")
    
    if user_email in ALLOWED_EMAILS:
        session['user_email'] = user_email
        return redirect("/home")
    else:
        return 'Unauthorized. Only certain emails are allowed.'


@auth.route('/login', methods=['GET','POST'])
def login():
    return render_template("login.html")

@auth.route('/authenticate')
def authenticate():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@auth.route("/logout")
def logout():
    session.clear()
    return redirect("/login")

@auth.route('/sign-up',methods=['GET','POST'])
def sign_up():
    
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstname')
        last_name = request.form.get('lastname')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')


        if len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif len(first_name) < 2:
            flash('Last name must be greater than 1 character.', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')

        else:
            flash('Account successfully created!', category='success')
            
    return render_template("sign_up.html")
