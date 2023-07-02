/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const argv = process.argv; // to take input from the command line
const axios = require("axios");

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function textFromFile(path) {
  fs.readFile(path, "utf8", (err, resp) => {
    if (err) {
      console.error(`${err}`);
      return;
    } else {
      generateText(resp);
    }
  });
}

// cat(argv[2]);
// 0 '/path/to/node'
// 1 '/path/to/step1.js'
// 2 input from user (path to file)

async function textFromURL(URL) {
  // http://google.com
  try {
    let resp = await axios.get(URL);
    // console.log(resp);
    generateText(resp.data);
  } catch (err) {
    console.error(err);
  }
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  textFromFile(path);
} else if (method === "url") {
  textFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
}
