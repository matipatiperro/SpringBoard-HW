"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Company {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create({ handle, name, description, numEmployees, logoUrl }) {
    const duplicateCheck = await db.query(
      `SELECT handle
           FROM companies
           WHERE handle = $1`,
      [handle]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate company: ${handle}`);

    const result = await db.query(
      `INSERT INTO companies
           (handle, name, description, num_employees, logo_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
      [handle, name, description, numEmployees, logoUrl]
    );
    const company = result.rows[0];

    return company;
  }

  /** Find all companies.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll(searchFilters = {}) {
    const companiesRes = await db.query(
      `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           ORDER BY name`
    );

    let { nameLike, minEmployees, maxEmployees } = searchFilters;
    // console.log("nameLike is: ", nameLike);
    // console.log("searchFilters is: ", searchFilters);

    if (minEmployees > maxEmployees) {
      throw new BadRequestError("Min employees cannot be greater than max");
    }
    // console.log(nameLike);
    let filtered = [];
    filtered.push(
      companiesRes.rows.filter((company) => {
        // console.log(Object.keys(company).length);
        let rtnCompany = null;
        if (minEmployees !== undefined) {
          if (company.numEmployees > minEmployees) {
            rtnCompany = true;
          } else {
            rtnCompany = false;
            return;
          }
        }
        if (maxEmployees !== undefined) {
          if (company.numEmployees < maxEmployees) {
            rtnCompany = true;
            // console.log("fine");
            // console.log(company.numEmployees);
          } else {
            rtnCompany = false;
            return;
          }
        }
        if (nameLike !== undefined) {
          nameLike = nameLike.toLowerCase();
          // console.log("company name is: ", company.name.toLowerCase());
          // console.log("nameLike name is: ", nameLike);
          if (company.name.toLowerCase().includes(nameLike)) {
            // console.log("rtnCompany is: ", rtnCompany);
            rtnCompany = true;
            // console.log("rtnCompany is: ", rtnCompany);
          } else {
            rtnCompany = false;
            return;
          }
        }
        // console.log(rtnCompany);
        if (rtnCompany === null) {
          // console.log("********");
          return companiesRes;
        } else if (rtnCompany === false) {
          return;
        } else {
          return company;
        }
      })
    );
    // console.log(filtered);

    // return companiesRes.rows;
    return filtered;
  }

  /** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(handle) {
    const companyRes = await db.query(
      `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           WHERE handle = $1`,
      [handle]
    );

    const company = companyRes.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  /** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async update(handle, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      numEmployees: "num_employees",
      logoUrl: "logo_url",
    });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE companies 
                      SET ${setCols} 
                      WHERE handle = ${handleVarIdx} 
                      RETURNING handle, 
                                name, 
                                description, 
                                num_employees AS "numEmployees", 
                                logo_url AS "logoUrl"`;
    const result = await db.query(querySql, [...values, handle]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(handle) {
    const result = await db.query(
      `DELETE
           FROM companies
           WHERE handle = $1
           RETURNING handle`,
      [handle]
    );
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);
  }
}

module.exports = Company;
