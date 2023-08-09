/** Database for lunchly */
// Create a database,  lunchly. if in psql CREATE DATABASE lunchly;

// Read in the sample data in data.sql
// \i data.sql

const pg = require("pg");

const db = new pg.Client("postgresql:///lunchly");

db.connect();

module.exports = db;
