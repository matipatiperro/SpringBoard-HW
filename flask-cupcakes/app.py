"""Flask app for Cupcakes"""
from flask import Flask, request, jsonify
from models import db, connect_db, Cupcakes


app = Flask(__name__)

# associate postgres to a database that has been created called blogly
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcake'
# show translated postgrs commands to SQL
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'not_telling'

# needed and not in the curriculum notes
app.app_context().push()

connect_db(app)
db.create_all()

@app.route('/api/cupcakes')
def list_cupcakes():
    
    """List of all cupcakes."""
    
    cupcakes = Cupcakes.query.all()
    serialized = [serialize_cupcakes(c) for c in cupcakes]
    return jsonify(cupcakes=serialized)


def serialize_cupcakes(cupcake):
    """Serialize a dessert SQLAlchemy obj to dictionary."""

    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image_url": cupcake.image
    }

@app.route('/api/cupcakes/<int:cupcake_id>')
def show_cupcake(cupcake_id):
    
    """specific cupcake."""
    
    cupcake = Cupcakes.query.get_or_404(cupcake_id)
    serialized = [serialize_cupcakes(cupcake)]
    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    
    """create a cupcake with data from user."""

    data = request.json
    
    cupcake = Cupcakes(flavor=data['flavor'], rating=data['rating'], size=data['size'], image=data['image'] or None)

    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake=serialize_cupcakes(cupcake)), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def edit_cupcake(cupcake_id):
    
    """update specific cupcake."""
    
    cupcake = Cupcakes.query.get_or_404(cupcake_id)

    data = request.json
    cupcake.flavor = data['flavor']
    cupcake.rating = data['rating']
    cupcake.size = data['size']
    cupcake.image = data['image']

    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake=serialize_cupcakes(cupcake)))

@app.route("/api/cupcakes/<int:cupcake_id>", methods=["DELETE"])
def remove_cupcake(cupcake_id):
    """Delete cupcake and return confirmation message.

    Returns JSON of {message: "Deleted"}
    """

    cupcake = Cupcakes.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="Deleted")