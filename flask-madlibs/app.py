from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

# Write a Flask app that imports the example story. Add a homepage for the application that 
# shows a form prompting you for all the words in the story:

app = Flask(__name__)
app.config['SECRET_KEY'] = "anything"

debug = DebugToolbarExtension(app)


@app.route("/")
def ask_questions():
    """home page, show prompts for input"""
    return render_template("index.html",promptlist = story.prompts)

@app.route("/story")
def present_story():
    """story page, show resulting story from input"""
    return render_template("story.html",text = story.generate(request.args))