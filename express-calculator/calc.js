const express = require("express");
const app = express();
const ExpressError = require("./expressError");

// localhost:3000
app.get("/", function (req, res) {
  return res.send(`This is the home page`);
});

/** Show info on instructor. */
// http://localhost:3000/mean/?nums=1,2,3
app.get("/mean", function (req, res) {
  if (!req.query.nums) {
    throw new ExpressError(
      "pass a query key of nums with a comma-separated list of numbers. like /?nums=[1,2,3]",
      400
    );
  }
  let numsAsStrings = parseQuery(req.query.nums);
  //   console.log(mean(numsAsStrings));
  return res.send(
    `mean of numbers ${req.query.nums} is: ${mean(numsAsStrings)}`
  );
});

app.get("/median", function (req, res) {
  if (!req.query.nums) {
    throw new ExpressError(
      "pass a query key of nums with a comma-separated list of numbers. like /?nums=[1,2,3]",
      400
    );
  }
  let numsAsStrings = parseQuery(req.query.nums);
  //   console.log(mean(numsAsStrings));
  return res.send(
    `median of numbers ${req.query.nums} is: ${median(numsAsStrings)}`
  );
});

app.get("/mode", function (req, res) {
  if (!req.query.nums) {
    throw new ExpressError(
      "pass a query key of nums with a comma-separated list of numbers. like /?nums=[1,2,3]",
      400
    );
  }
  let numsAsStrings = parseQuery(req.query.nums);
  //   console.log(mean(numsAsStrings));
  return res.send(
    `mode of numbers ${req.query.nums} is: ${mode(numsAsStrings)}`
  );
});

app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});

const mean = function (nums) {
  const sum = nums.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  return sum / nums.length;
};

const median = function (nums) {
  // sort and get the middle element

  nums.sort((a, b) => a - b);

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  return median;
};

const mode = function (arr) {
  let arrObject = {};
  for (let i = 0; i < arr.length; i++) {
    if (!arrObject[arr[i]]) {
      arrObject[arr[i]] = 1;
    } else {
      arrObject[arr[i]] = Number(arrObject[arr[i]]) + 1;
    }
  }
  console.log(arrObject);

  let count = 0;
  let mostFrequent;

  for (let key in arrObject) {
    if (arrObject[key] > count) {
      mostFrequent = key;
      count = arrObject[key];
    }
  }

  return +mostFrequent;
};

const parseQuery = function (queryKey) {
  // should be a string of nums
  let stringToNums = queryKey.split(",");
  let nums = [];
  for (let i = 0; i < stringToNums.length; i++) {
    let num = Number(stringToNums[i]);
    if (Number.isNaN(num)) {
      return new Error(
        `The value '${stringToNums[i]}' at index ${i} is not a valid number.`
      );
    }
    nums.push(num);
  }
  return nums;
};
