from flask import Flask, request, render_template, session, redirect, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "very_secret"

boggle_game = Boggle()

@app.route("/",methods=('GET', 'POST'))
def home():
    "home page, show board"
    if request.method == 'GET':
        the_board = boggle_game.make_board()
        session['board'] = the_board
        return render_template("index.html", board = the_board)
    else:
        response = request.form['submitted-word']
        # response = request.args.get('submitted-word')
        print(response)
        return redirect('/check')

@app.route("/check")
def check_word():
    """Check if word is in dictionary."""

    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})