// jobly=# select * from jobs;
//  id  |                       title                       | salary | equity |     company_handle
// -----+---------------------------------------------------+--------+--------+-------------------------
//    1 | Conservator, furniture                            | 110000 |      0 | watson-davis
//    2 | Information officer                               | 200000 |      0 | hall-mills

"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Jobs {
  /** Create a jobs (from data), update db, return new job data.
   *
   * data should be { id, title, salary, equity, company_handle }
   *
   * Returns { title, salary, equity, company_handle }
   *
   * Throws BadRequestError if job already in database.
   * */

  static async create(data) {
    const duplicateCheck = await db.query(
      `SELECT title
             FROM jobs
             WHERE title = $1`,
      [data.title]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate company: ${data.title}`);

    console.log("jobs title is: ", data.title);
    const result = await db.query(
      `INSERT INTO jobs
             (title, salary, equity, company_handle)
             VALUES ($1, $2, $3, $4)
             RETURNING title, salary, equity, company_handle`,
      [data.title, data.salary, data.equity, data.company_handle]
    );
    const job = result.rows[0];

    return job;
  }
  /** Find all jobs.
   *
   * Returns [{ title, salary, equity, company_handle }]
   * */

  //   static async findAll() {
  //     const jobsRes = await db.query(
  //       `SELECT title, salary, equity, company_handle FROM jobs;`
  //     );
  //     return jobsRes.rows;
  //   }

  static async findAll({ minSalary, hasEquity, title } = {}) {
    let query = `SELECT jobs.id,
                        jobs.title,
                        jobs.salary,
                        jobs.equity,
                        jobs.company_handle,
                        companies.name
                 FROM jobs
                   LEFT JOIN companies ON companies.handle = jobs.company_handle`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (minSalary !== undefined) {
      queryValues.push(minSalary);
      console.log("minSalary is: ", minSalary);
      whereExpressions.push(`salary >= $${queryValues.length}`);
    }

    if (hasEquity === true) {
      whereExpressions.push(`equity > 0`);
    }

    if (title !== undefined) {
      queryValues.push(`%${title}%`);
      whereExpressions.push(`title ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY title";
    const jobsRes = await db.query(query, queryValues);
    return jobsRes.rows;
  }

  /** Given a company handle, return job data about company.
   *
   * Returns { title, salary, equity, company_handle }
   *
   * Throws NotFoundError if not found.
   **/

  static async get_handle(company_handle) {
    const jobsRes = await db.query(
      `SELECT title, salary, equity, company_handle FROM jobs WHERE company_handle = $1`,
      [company_handle]
    );

    const jobs = jobsRes.rows[0];

    if (!jobs) throw new NotFoundError(`No company: ${company_handle}`);

    return jobs;
  }

  /** Given a job title, return data about job.
   *
   * Returns { title, salary, equity, company_handle }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(title) {
    const jobsRes = await db.query(
      `SELECT title, salary, equity, company_handle FROM jobs WHERE title = $1`,
      [title]
    );

    const job = jobsRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);

    return job;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(title) {
    const result = await db.query(
      `DELETE
               FROM jobs
               WHERE title = $1
               RETURNING title`,
      [title]
    );
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);
  }
}

module.exports = Jobs;
