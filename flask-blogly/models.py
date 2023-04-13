"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

default_image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"

class User(db.Model):
    """User."""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.String(50),
                     nullable=False,
                     unique=False)
    last_name = db.Column(db.String(50),
                    nullable=False,
                    unique=False)
    image_url = db.Column(db.String(50),
                    nullable=False,
                    unique=True, default = default_image)

def connect_db(app):
    """Connect this database to provided Flask app."""

    db.app = app
    db.init_app(app)

# need to create the db, only do once
# ipython
# %run app.py
# db.creat_all()