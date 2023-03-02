from flask import Flask

app = Flask(__name__)
# source venv/bin/activate
# flask run

@app.route('/welcome')
def welcome_page():
	return "welcome"

@app.route('/welcome/home')
def welcome_home():
	return "welcome home"

@app.route('/welcome/back')
def welcome_back():
	return "welcome back"