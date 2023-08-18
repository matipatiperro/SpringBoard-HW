const express = require("express");
const Book = require("../models/book");
const jsonSchema = require("jsonschema");
const bookSchema = require("../schemas/bookSchema.json");
// https://www.jsonschema.net/

const router = new express.Router();

/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[isbn]  => {book: book} */

router.get("/:isbn", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.isbn);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */
//http://localhost:3000/books
router.post("/", async function (req, res, next) {
  try {
    const result = jsonSchema.validate(req.body, bookSchema);
    if (!result.valid) {
      return next({
        status: 400,
        error: result.errors.map((e) => e.stack),
      });
    }
    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    const result = jsonSchema.validate(req.body, bookSchema);
    if (!result.valid) {
      return next({
        status: 400,
        error: result.errors.map((e) => e.stack),
      });
    }
    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
