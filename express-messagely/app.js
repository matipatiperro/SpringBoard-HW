/** Express app for message.ly. */
// ## **Step 0: Setup**
// - Install requirements, and make Git repo.
// - Create ***messagely*** database and import schema from ***data.sql***
// in psql CREATE DATABASE messagely;
// \i data.sql

// to run the app: node server.js

const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/auth");

const app = express();
const ExpressError = require("./expressError");

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow connections to all routes from any browser
app.use(cors());

// get auth token for all routes
app.use(authenticateJWT);

/** routes */

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

app.get("/", function (req, res) {
  return res.send(`This is the home page`);
});

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message,
  });
});
// console.log("here");
module.exports = app;
