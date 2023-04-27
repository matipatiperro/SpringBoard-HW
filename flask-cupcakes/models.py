"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Create Cupcake model should have the following columns:
# - ***id***: a unique primary key that is an auto-incrementing integer
# - ***flavor***: a not-nullable text column
# - ***size***: a not-nullable text column
# - ***rating***: a not-nullable column that is a float
# - ***image***: a non-nullable text column. If an image is not given, default to [https://tinyurl.com/demo-cupcake](https://tinyurl.com/demo-cupcake)

default_image = "https://tinyurl.com/demo-cupcake](https://tinyurl.com/demo-cupcake"

class Cupcakes(db.Model):
    """cupcakes."""

    __tablename__ = "cupcake"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    flavor = db.Column(db.String(50),
                     nullable=False,
                     unique=False)
    size = db.Column(db.String(50),
                    nullable=False,
                    unique=False)
    rating = db.Column(db.Float,
                    nullable=False,
                    unique=False)
    image = db.Column(db.String(150),
                    nullable=False,
                    unique=False, default = default_image)


def connect_db(app):
    """Connect this database to provided Flask app."""

    db.app = app
    db.init_app(app)