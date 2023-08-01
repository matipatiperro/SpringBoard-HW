/** Database setup for BizTime. */

const { Client } = require("pg");

let db = new Client({
  connectionString: "postgresql:///biztime",
});

db.connect();

module.exports = db;

// psql
// CREATE DATABASE biztime
// \q
// psql < data.sql
