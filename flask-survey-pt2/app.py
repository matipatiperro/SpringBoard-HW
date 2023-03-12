from flask import Flask, render_template, flash, request, redirect, session
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "very_secret!"

responses = []

@app.route('/',methods = ['POST', 'GET'])
def home_page():
    survey = satisfaction_survey
    if request.method == 'GET':
        session["responses"] = []
        return render_template("home_page.html",title = survey.title, text = survey.instructions)
    else:
        return redirect("/questions/0")

@app.route('/questions/<int:qnum>',methods = ['POST', 'GET'])
def questions(qnum):
    survey = satisfaction_survey
    responses = session.get("responses")
    print(responses)
    if (responses is None):
        # trying to access question page too soon
        return redirect("/")
    
    if (len(responses) == len(survey.questions)):
        # They've answered all the questions! Thank them.
        return redirect("/completed")

    if (qnum>len(responses)):
        # in case they go out of order
        flash(f"Invalid question id: {qnum}.")
        url = "/questions/"+str(len(responses))
        return redirect(url)

    if request.method == 'GET':
        title = survey.title + ": question " + str(qnum)
        question = survey.questions[qnum].question
        return render_template("questions.html",title = title, text = question, choices =survey.questions[qnum].choices,qnum=qnum )
    else:
        # responses.append(request.form["answer"])

        # add this response to the session
        responses = session["responses"]
        responses.append(request.form["answer"])
        session["responses"] = responses
        
        qnum +=1
        url = "/questions/"+str(qnum)
        return redirect(url)

@app.route('/completed')
def answered():
    responses = session.get("responses")
    title="Survey complete"
    text = "thank you"
    return render_template("completed.html",title = title, text = text,answers = responses)