from flask import Flask, request, redirect, render_template
from models import db, connect_db, User

"""Blogly application."""


app = Flask(__name__)

# associate postgres to a database that has been created called blogly
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
# show translated postgrs commands to SQL
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'not_telling'

# with app.app_context():
#     db.create_all()

connect_db(app)
db.create_all()


@app.route('/', methods = ['POST', 'GET'])
def root():
    if request.method=='GET':
        """Homepage redirects to list of users."""
        return render_template("users.html")
    else:
        return render_template("create.html")
        # return redirect('/create')

@app.route('/users')
def users():
    """List of users."""
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template("users.html", users = users)

@app.route('/create', methods=["GET"])
def create_user_form():
    """form to create a new user"""

    return render_template('create.html')

@app.route("/create", methods=["POST"])
def create_user():
    """submitted form creating a new user"""

    new_user = User(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'],
        image_url=request.form['image_url'] or None)

    db.session.add(new_user)
    db.session.commit()

    return redirect("/users.html")

@app.route('/users/<int:user_id>')
def users_show(user_id):
    """Show a page with info on a specific user"""

    user = User.query.get_or_404(user_id)
    return render_template('user_details.html', user=user)

@app.route('/users/<int:user_id>/edit')
def users_edit(user_id):
    """Show a form to edit an existing user"""

    user = User.query.get_or_404(user_id)
    return render_template('edit.html', user=user)