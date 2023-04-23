from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

default_img = "https://www.creativefabrica.com/wp-content/uploads/2020/08/17/minimalist-paw-symbol-Graphics-4998949-1-1-580x387.jpg"

class Pet(db.Model):
    """pet class for adopt hw"""

    __tablename__ = "pets"

    # - ***id***: auto-incrementing integer
    id = db.Column(db.Integer, primary_key=True)
    # - ***name***: text, required
    name = db.Column(db.Text, nullable = False)
    # - ***species***: text, required
    species = db.Column(db.Text, nullable = False)
    # - ***photo_url***: text, optional
    image_url = db.Column(db.Text, nullable = True, default = default_img)
    # - ***age***: integer, optional
    age = db.Column(db.Integer)
    # - ***notes***: text, optional
    notes = db.Column(db.Text)
    # - ***available***: true/false, required, should default to available
    available = db.Column(db.Boolean, nullable = False, default = True)

    

def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)