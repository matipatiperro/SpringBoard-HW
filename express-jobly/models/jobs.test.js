"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Jobs = require("./jobs.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */
// INSERT INTO jobs(title, salary, equity, company_handle)
//       VALUES ('j1', '100', 1, 'C1'),
describe("create", function () {
  const newJob = {
    title: "J4",
    salary: 400,
    equity: null,
    company_handle: "c3",
  };
  //   console.log(newJob);
  test("works", async function () {
    // console.log("*******in jobs work************");
    // expect(true).toEqual(true);
    let job = await Jobs.create(newJob);
    // console.log(job);
    expect(job).toEqual(newJob);

    const result = await db.query(
      `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE title = 'J4'`
    );
    console.log("result", result.rows);
    expect(result.rows).toEqual([
      {
        title: "J4",
        salary: 400,
        equity: null,
        company_handle: "c3",
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Jobs.create(newJob);
      await Jobs.create(newJob);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */
describe("findAll", function () {
  test("works: all, no filter", async function () {
    let jobs = await Jobs.findAll();
    console.log(jobs);
    expect(jobs).toEqual([
      {
        title: "J1",
        salary: 100,
        equity: null,
        company_handle: "c1",
      },
      {
        title: "J2",
        salary: 200,
        equity: null,
        company_handle: "c2",
      },
      {
        title: "J3",
        salary: 300,
        equity: null,
        company_handle: "c3",
      },
    ]);
  });
});
