from flask import Flask, request
import operations

app = Flask(__name__)

@app.route("/add")
def addition():
    """add a and b query parameters."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    answer = operations.add(a, b)

    return str(answer)

@app.route("/sub")
def subtraction():
    """subtract a and b query parameters."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    answer = operations.sub(a, b)

    return str(answer)

@app.route("/mult")
def multiplication():
    """multiply a and b query parameters."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    answer = operations.mult(a, b)

    return str(answer)

@app.route("/div")
def division():
    """divid a and b query parameters."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    answer = operations.div(a, b)

    return str(answer) 