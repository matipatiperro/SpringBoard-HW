from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_hom(self):
        with self.client:
            response = self.client.get('/')
            self.assertEqual(response.status_code,'200')