// call with node app.js
// http://localhost:3000/

const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());
const items = require("./fakeDb");

// 1. ***GET /items*** - this should render a list of shopping items.
// Here is what a response looks like:
// **[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]**
app.get("/items", function (req, res, next) {
  try {
    console.log(items);
    return res.json(items);
  } catch (err) {
    return next(err);
  }
});

// 2. ***POST /items*** - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request/response looks like:
// **{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}**

// NOTE*** in postman when sending a post request with a body, select JSON .... default is text
app.post("/items", function (req, res, next) {
  try {
    // if (true) {
    if (
      req.body.name != null &&
      req.body.price != null &&
      Object.keys(req.body).length === 2
    ) {
      //   console.log(req.body.name);
      items.push(req.body);
      //   console.log(req.body);
      //   console.log(Object.keys(req.body).length);
    }
    return res.json(items);
  } catch (err) {
    return next(err);
  }
});

// 3. ***GET /items/:name*** - this route should display a single item’s name and price.
// Here is what a sample response looks like:
// **{“name”: “popsicle”, “price”: 1.45}**
app.get("/items/:name", function (req, res, next) {
  try {
    let foundItem = items.find((v) => v.name === req.params["name"]);

    console.log(foundItem);
    // console.log(items);
    console.log(req.params.name);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

// 4. ***PATCH /items/:name***, this route should modify a single item’s name and/or price.
// Here is what a sample request/response looks like:
// **{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}**

app.patch("/items/:name", (req, res, next) => {
  try {
    if (items.find(req.params.name)) {
      if (
        req.body.name != null &&
        req.body.price != null &&
        Object.keys(req.body).length === 2
      ) {
        //   console.log(req.body.name);
        items.push(req.body);
        //   console.log(req.body);
        //   console.log(Object.keys(req.body).length);
      }
      return res.json(items);
    }
  } catch (err) {
    return next(err);
  }
});

// 5. ***DELETE /items/:name*** - this route should allow you to delete a specific item from the array.
// Here is what a sample response looks like:
// **{message: “Deleted”}**

app.delete("/items/:name", (req, res, next) => {
  try {
    let foundIdx = items.findIndex((v) => v.name === req.params.name);
    console.log(foundIdx);
    if (foundIdx === -1) {
      throw { message: "Not Found", status: 404 };
    }
    items.splice(foundIdx, 1); // 2nd parameter means remove one item only
    return res.json(items);
  } catch (err) {
    return next(err);
  }
});

app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});
