from flask import Flask, render_template, url_for, flash, redirect

from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SECRET_KEY'] = "none"

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///adopt"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.app_context().push()

connect_db(app)
db.create_all()


########################
@app.route("/")
def show_pets():
    """List all pets."""

    pets = Pet.query.all()
    return render_template("pet_list.html", pets=pets)

@app.route("/add")
def add_pet():
    """Add a pet."""

    form = AddPetForm()
    # re-present form for editing
    return render_template("add_pet.html", form=form)

@app.route("/add", methods=["POST"])
def add_pet_submit():
    """Add a pet."""
    form = AddPetForm()

    if form.validate_on_submit():
        data = {k: v for k, v in form.data.items() if k != "csrf_token"}
        new_pet = Pet(**data)
        # new_pet = Pet(name=form.name.data, age=form.age.data, ...)
        db.session.add(new_pet)
        db.session.commit()
        flash(f"{new_pet.name} added.")
        return redirect(url_for('show_pets'))

    else:
        # re-present form for editing
        return render_template("add_pet.html", form=form)

@app.route("/<int:pet_id>", methods=["GET", "POST"])
def edit_pet(pet_id):
    """Edit pet."""

    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.notes = form.notes.data
        pet.available = form.available.data
        pet.photo_url = form.photo_url.data
        db.session.commit()
        flash(f"{pet.name} updated.")
        return redirect(url_for('show_pets'))

    else:
        # failed; re-present form for editing
        return render_template("edit_pet.html", form=form, pet=pet)

@app.route('/<int:pet_id>/delete', methods=["POST"])
def delete_pet(pet_id):
    """delete existing pet"""

    pet = Pet.query.get_or_404(pet_id)
    db.session.delete(pet)
    db.session.commit()
    flash(f"{pet.name} removed.")

    return redirect(url_for('show_pets'))