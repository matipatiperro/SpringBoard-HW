const fs = require("fs");
const argv = process.argv; // to take input from the command line
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`${err}`);
      return;
    }
    console.log(data);
  });
}

// cat(argv[2]);
// 0 '/path/to/node'
// 1 '/path/to/step1.js'
// 2 input from user (path to file)

async function webCat(path) {
  // http://google.com
  try {
    let resp = await axios.get(path);
    console.log(resp.data);
  } catch (err) {
    console.error(err);
  }
}

if (argv[2].slice(0, 4) === "http") {
  webCat(argv[2]);
} else {
  cat(argv[2]);
}
