from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, DataRequired, Length, NumberRange, url, Optional

class AddPetForm(FlaskForm):
    name = StringField(
        "Pet Name",
        validators=[InputRequired()],
    )

    species = SelectField(
        "Species",
        choices=[("cat", "Cat"), ("dog", "Dog"), ("porcupine", "Porcupine")],
    )

    image_url = StringField(
        "Photo URL",
        validators=[DataRequired(), url()],
    )

    age = IntegerField(
        "Age",
        validators=[Optional(), NumberRange(min=0, max=30)],
    )

    notes = TextAreaField(
        "Comments",
        validators=[Optional(), Length(min=10)],
    )

class EditPetForm(FlaskForm):
    """Form for editing an existing pet."""

    photo_url = StringField(
        "Photo URL",
        validators=[Optional(), url()],
    )

    notes = TextAreaField(
        "Comments",
        validators=[Optional(), Length(min=10)],
    )

    available = BooleanField("Available?")