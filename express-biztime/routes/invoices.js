const express = require("express");
// http://localhost:3000/invoices

const app = express();
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

// GET /invoices : Return info on invoices: like {invoices: [{id, comp_code}, ...]}
router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(`SELECT * FROM invoices`);
    // console.log(...results.rows);
    return res.json({ invoices: results.rows });
  } catch (err) {
    return next(err);
  }
});

// GET /invoices/[id] : Returns obj on given invoice.
// If invoice cannot be found, returns 404.
// Returns {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}
router.get("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    const invoice = await db.query(`SELECT * FROM invoices WHERE id=$1`, [id]);
    return res.json({ invoice: invoice.rows });
  } catch (err) {
    return next(err);
  }
});

// POST /invoices : Adds an invoice. Needs to be passed in JSON body of: {comp_code, amt}
// Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.post("/", async function (req, res, next) {
  try {
    let { comp_code, amt, paid, add_date, paid_date } = req.body;
    const inserted = await db.query(
      `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
    VALUES ($1,$2,$3,$4,$5) RETURNING comp_code, amt, paid, add_date, paid_date`,
      [comp_code, amt, paid, add_date, paid_date]
    );
    return res.status(201).json({ company: inserted.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// PUT /invoices/[id] : Updates an invoice. If invoice cannot be found, returns a 404.
// Needs to be passed in a JSON body of {amt} Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.put("/:id", async function (req, res, next) {
  try {
    // part 2, check for specific data, Needs to be passed in a JSON body of {amt, paid}
    //  If paying unpaid invoice: sets paid_date to today
    // • If un-paying: sets paid_date to null
    // • Else: keep current paid_date
    // Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
    let { amt, paid } = req.body;
    let id = req.params.id;
    let paidDate = null;
    const invQuery = await db.query(
      `SELECT * FROM invoices
       WHERE id = $1`,
      [id]
    );

    if (invQuery.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }
    const currPaidDate = currResult.rows[0].paid_date;
    if (!currPaidDate && paid) {
      paidDate = new Date();
    } else if (!paid) {
      paidDate = null;
    } else {
      paidDate = currPaidDate;
    }
    // try {
    //   let id = req.params.id;
    //   let { comp_code, amt, paid, add_date, paid_date } = req.body;
    const updateQuery = await db.query(
      `UPDATE invoices 
      SET comp_code = $1, amt = $2, paid = $3, add_date = $4, paid_date = $5
      WHERE id = $6
      RETURNING comp_code, amt, paid, add_date, paid_date`,
      [comp_code, amt, paid, add_date, paid_date, id]
    );
    return res.json({ inserted: updateQuery.rows[0] });
    // if (invQuery.rows.length === 0) {
    //   throw new ExpressError(`No such company: ${id}`, 404);
    // } else {
    //   return res.json({ inserted: invQuery.rows[0] });
    // }
  } catch (err) {
    return next(err);
  }
});
// DELETE /invoices/[id] : Deletes an invoice.If invoice cannot be found, returns a 404.
// Returns: {status: "deleted"} Also, one route from the previous part should be updated:
router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    const removed = await db.query(
      `DELETE FROM invoices WHERE id =$1 RETURNING id`,
      [id]
    );
    if (removed.rows.length == 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    } else {
      return res.json({ status: "deleted" });
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

// ### **Add a Many-to-Many**
// **A larger feature**.
// Add a table for “industries”, where there is a ***code*** and an ***industry*** field (for example: “acct” and “Accounting”).
// Add a table that allows an industry to be connected to several companies and to have a company belong to several industries.
// Add some sample data (by hand in ***psql*** is fine)
