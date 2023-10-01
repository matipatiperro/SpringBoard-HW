process.env.NODE_ENV = "test";

// SuperTest is a Node.js library that helps developers test APIs.
// It extends another library called superagent, a JavaScript HTTP client for Node.js
const request = require("supertest");

const app = require("../app");
const db = require("../db");

// isbn of sample book
let book_isbn;

// CREATE TABLE books (
//     isbn TEXT PRIMARY KEY,
//     amazon_url TEXT,
//     author TEXT,
//     language TEXT,
//     pages INTEGER,
//     publisher TEXT,
//     title TEXT,
//     year INTEGER
//   );

beforeAll(async () => {
  let result =
    await db.query(`INSERT INTO "books" (isbn,amazon_url,author,language,pages,publisher,title,year)
    VALUES(
    '1234567890',
    'https://amazon.com/first',
    'Mati',
    'English',
    100,
    'Mati publishers',
    'my first book', 2023)
  RETURNING isbn`);
  console.log(result.rows[0].isbn);
  book_isbn = result.rows[0].isbn;
});

describe("GET /books", function () {
  test("Gets a list of 1 book", async function () {
    const response = await request(app).get(`/books`);
    console.log("**************************");
    console.log(response.body);
    const books = response.body.books;
    expect(books).toHaveLength(1);
    expect(books[0]).toHaveProperty("isbn");
    expect(books[0]).toHaveProperty("amazon_url");
  });
});

describe("DELETE /books/:isbn", function () {
  test("Deletes a single a book", async function () {
    const response = await request(app).delete(`/books/${book_isbn}`);
    expect(response.body).toEqual({ message: "Book deleted" });
  });
});

// afterEach(async function () {
//   await db.query("DELETE FROM books-test");
// });

afterAll(async function () {
  await db.end();
});
