"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        # User.query.delete()
        # Message.query.delete()
        # Follows.query.delete()

        db.drop_all()
        db.create_all()

        u1 = User.signup("test1", "email1@email.com", "password", None)
        uid1 = 1111
        u1.id = uid1

        u2 = User.signup("test2", "email2@email.com", "password", None)
        uid2 = 2222
        u2.id = uid2

        # print(u1)

        db.session.commit()

        u1 = User.query.get(uid1)
        u2 = User.query.get(uid2)

        # print(u1)
        # set the created user to the class to be used outside of setup
        self.u1 = u1
        self.uid1 = uid1

        self.u2 = u2
        self.uid2 = uid2


        self.client = app.test_client()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)


# Does is_following successfully detect when user1 is following user2?

    def test_user_follows(self):
        self.u1.following.append(self.u2)
        db.session.commit()

        # check user 2 follow status
        self.assertEqual(len(self.u2.following), 0)
        self.assertEqual(len(self.u2.followers), 1)
        # check user 1 follow status
        self.assertEqual(len(self.u1.following), 1)
        self.assertEqual(len(self.u1.followers), 0)

        # check that the right user ID is followed by user 1 - user 2 should be followed by user 1
        self.assertEqual(self.u2.followers[0].id, self.u1.id)
        # check that the right user ID is following user 2 - user 1 should be following user 2
        self.assertEqual(self.u1.following[0].id, self.u2.id)

    def test_is_following(self):
        # test the is following method
        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertTrue(self.u1.is_following(self.u2))
        self.assertFalse(self.u2.is_following(self.u1))

    # Does is_followed_by successfully detect when user1 is followed by user2?
    def test_user_followed_by(self):
        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertTrue(self.u2.is_followed_by(self.u1))
        self.assertFalse(self.u1.is_followed_by(self.u2))


    # Does User.create successfully create a new user given valid credentials?
    def test_create_profile(self):
        u2 = User.signup("test3", "email3@email.com", "password", None)
        uid2 = 3333
        u2.id = uid2

        db.session.commit()

        u_test = User.query.get(uid2)
        self.assertIsNotNone(u_test)
        self.assertEqual(u_test.username, "test3")
        self.assertEqual(u_test.email, "email3@email.com")
        self.assertNotEqual(u_test.password, "password")

    def test_valid_authentication(self):
        u = User.authenticate(self.u1.username, "password")
        self.assertIsNotNone(u)
        self.assertEqual(u.id, self.uid1)
    
    def test_invalid_username(self):
        self.assertFalse(User.authenticate("badusername", "password"))