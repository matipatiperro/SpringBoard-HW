from flask import Flask, render_template, redirect, request, session
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm, DeleteForm
from werkzeug.exceptions import Unauthorized


# app = Flask(__name__)
app = Flask(__name__,
            static_url_path='', 
            static_folder='/',
            template_folder='templates')
# app = Flask(__name__, static_url_path='/')

# associate postgres to a database that has been created called blogly
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///auth_users'
# show translated postgrs commands to SQL
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'not_telling'

# needed and not in the curriculum notes
app.app_context().push()

connect_db(app)
db.create_all()

@app.route("/")
def homepage():
    """Show homepage with links to site areas."""

    return redirect("/register")

@app.route('/register', methods=['GET', 'POST'])
def register():
    """Register a user: show form and handle form submission."""

    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data

        user = User.register(username, password, first_name, last_name, email)

        db.session.commit()
        session['username'] = user.username

        return redirect(f"/{user.username}")

    else:
        return render_template("register.html", form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    """Produce login form or handle login."""

    if "username" in session:
        return redirect(f"/{session['username']}")

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)  # <User> or False
        if user:
            session['username'] = user.username
            return redirect(f"/{user.username}")
        else:
            form.username.errors = ["Invalid username/password."]
            return render_template("users/login.html", form=form)

    return render_template("login.html", form=form)

@app.route("/logout")
def logout():
    """Logout route."""

    session.pop("username")
    return redirect("/login")

# <> is causing the css link to break
@app.route("/<username>")
def show_user(username):
    """Example page for logged-in-users."""

    if "username" not in session or username != session['username']:
        # raise Unauthorized()
        return ("user not found")

    user = User.query.get(username)
    form = DeleteForm()

    return render_template("/show_user.html", user=user,form=form) 


@app.route("/<username>/feedback/new", methods=["GET", "POST"])
def new_feedback(username):
    """Show add-feedback form and process it."""

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(
            title=title,
            content=content,
            username=username,
        )

        db.session.add(feedback)
        db.session.commit()

        return redirect(f"/{feedback.username}")

    else:
        return render_template("new_feedback.html", form=form)

@app.route("/<username>/delete", methods=["POST"])
def remove_user(username):
    """Remove user nad redirect to login."""

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop("username")

    return redirect("/login")

@app.route("/<int:feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):
    """Delete feedback."""

    feedback = Feedback.query.get(feedback_id)
    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()

    form = DeleteForm()

    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()

    return redirect(f"/{feedback.username}")