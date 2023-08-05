const express = require("express");
const slugify = require("slugify"); // part 2 -converts a string to a URL-friendly slug format

const app = express();
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

//
router.get("/", async function (req, res, next) {
  //   console.log("HERE");
  try {
    const results = await db.query(`SELECT name FROM companies`);
    // console.log(...results.rows);
    return res.json({ companies: results.rows });
  } catch (err) {
    return next(err);
  }
});

// Change this route:
// - when viewing details for a company, you can see the names of the industries for that company
router.get("/:code", async function (req, res, next) {
  // console.log("HERE1");
  try {
    let code = req.params.code;
    const compResults = await db.query(
      `SELECT name FROM companies WHERE code =$1`,
      [code]
    );
    console.log(...compResults.rows);
    const indResult = await db.query(
      `SELECT industries_code
       FROM industries_companies
       WHERE companies_code = $1`,
      [code]
    );
    console.log(...compResults.rows);
    console.log(...indResult.rows);
    return res.json({ company: compResults.rows, industries: indResult.rows });
  } catch (err) {
    return next(err);
  }
});

// POST /companies : Adds a company. Needs to be given JSON like: {code, name, description}
// Returns obj of new company:  {company: {code, name, description}}
router.post("/", async function (req, res, next) {
  //   console.log("HERE2");
  try {
    let { name, description } = req.body;
    // let code = name.toLowerCase();
    let code = slugify(name);
    const inserted = await db.query(
      `INSERT INTO companies (code, name, description)
    VALUES ($1,$2,$3) RETURNING code, name, description`,
      [code, name, description]
    );
    return res.status(201).json({ company: inserted.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// PUT /companies/[code] : Edit existing company. Should return 404 if company cannot be found.
// Needs to be given JSON like: {name, description}
// Returns update company object: {company: {code, name, description}}
router.put("/:code", async function (req, res, next) {
  //   console.log("HERHEEH");
  try {
    let { name, description } = req.body;
    let code = req.params.code.toLowerCase();
    const updated = await db.query(
      `UPDATE companies 
      SET code = $1, name = $2, description = $3 
      WHERE code = $1 
      RETURNING code, name, description`,
      [code, name, description]
    );
    if (updated.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    } else {
      return res.json({ company: updated.rows[0] });
    }
  } catch (err) {
    return next(err);
  }
});

// DELETE /companies/[code] : Deletes company. Should return 404 if company cannot be found.
// Returns {status: "deleted"}

router.delete("/:code", async function (req, res, next) {
  try {
    let code = req.params.code;
    const removed = await db.query(
      `DELETE FROM companies WHERE code =$1 RETURNING code`,
      [code]
    );
    if (removed.rows.length == 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    } else {
      return res.json({ status: "deleted" });
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
