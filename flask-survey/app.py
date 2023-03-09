from flask import Flask, render_template, flash, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey


app = Flask(__name__)
app.config['SECRET_KEY'] = "very_secret!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

responses = []

@app.route('/',methods = ['POST', 'GET'])
def home_page():
    if request.method == 'GET':
        title = satisfaction_survey.title
        text = satisfaction_survey.instructions
        return render_template("home.html", title = title, text=text)
        # return redirect("/questions/0")
    else:
        return redirect("/questions/0")



@app.route('/questions/<int:qnum>',methods = ['POST', 'GET'])
def questions(qnum):
    title = satisfaction_survey.title
    text = satisfaction_survey.questions[qnum].question
    choices = satisfaction_survey.questions[qnum].choices
    if (responses is None):
        # trying to access question page too soon
        return redirect("/")

    if (qnum >= len(satisfaction_survey.questions)):
        # They've answered all the questions! Thank them.
        print("equal")
        return redirect("/answered")

    if request.method == 'GET':
        return render_template("questions.html", title = title, text = text, choices = choices, qnum=qnum)
    else:
        # qnum+=1
        user_selection = request.form['answer']
        responses.append(user_selection)
        print(responses)
        return render_template("questions.html", title = title, text = text, choices = choices, qnum=qnum)
        # return redirect("/questions/<int:qnum>",title = title,text = user_selection)

@app.route('/answered')
def answered():
    title="Survey complete"
    text = "thank you"
    return render_template("answered.html",title = title, text = text)