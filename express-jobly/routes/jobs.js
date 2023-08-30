"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureLoggedIn } = require("../middleware/auth");
const { ensureAdmin } = require("../middleware/auth");

const Jobs = require("../models/jobs");

// const companyNewSchema = require("../schemas/companyNew.json");
// const companyUpdateSchema = require("../schemas/companyUpdate.json");

const router = new express.Router();

/** POST / { jobs } =>  { jobs }
 *
 * jobs should be { id, title, salary, equity, company_handle }
 *
 * Returns { title, salary, equity, company_handle }
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, companyNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    // console.log(req.body);
    const jobs = await Jobs.create(req.body);
    return res.status(201).json({ jobs });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { jobs: [ { title, salary, equity, company_handle }, ...] }
 *
 *
 * Authorization required: none
 * ex: http://localhost:3001/jobs
 * ex: http://localhost:3001/jobs?title=Astronomer&minSalary=100000
 * http://localhost:3001/jobs?minSalary=150000
 * use request.query: { nameLike: net }
 */

router.get("/", async function (req, res, next) {
  const searchQ = req.query;
  // arrive as strings from querystring, but we want as int/bool
  if (searchQ.minSalary !== undefined) searchQ.minSalary = +searchQ.minSalary;
  searchQ.hasEquity = searchQ.hasEquity === "true";
  console.log(searchQ);
  try {
    const jobs = await Jobs.findAll(searchQ);
    // console.log(jobs);
    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }

  //   try {
  //     const jobs = await Jobs.findAll();
  //     return res.json({ jobs });
  //   } catch (err) {
  //     return next(err);
  //   }
});

/** GET /  =>
 *   { jobs: [ { title, salary, equity, company_handle }, ...] }
 *
 *
 * Authorization required: none
 * ex: http://localhost:3001/jobs
 * use request.query: { nameLike: net }
 */

// router.get("/:company_handle", async function (req, res, next) {
//   try {
//     const jobs = await Jobs.get(req.params.company_handle);
//     return res.json({ jobs });
//   } catch (err) {
//     return next(err);
//   }
// });

/** GET /  =>
 *   { jobs: [ { title, salary, equity, company_handle }, ...] }
 *
 *
 * Authorization required: none
 * ex: http://localhost:3001/jobs
 * use request.query: { nameLike: net }
 */

router.get("/:title", async function (req, res, next) {
  try {
    const jobs = await Jobs.get(req.params.title);
    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[title]  =>  { deleted: title }
 *
 * Authorization: admin
 */

router.delete("/:title", ensureAdmin, async function (req, res, next) {
  try {
    await Jobs.remove(req.params.title);
    return res.json({ deleted: req.params.title });
  } catch (err) {
    return next(err);
  }
});
module.exports = router;
