const fs = require("fs");
const argv = process.argv; // to take input from the command line
const axios = require("axios");

function handleOutput(text, outLoc) {
  if (outLoc) {
    fs.writeFile(outLoc, text, "utf8", function (err) {
      if (err) {
        console.error(`${err}`);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, outLoc) {
  fs.readFile(path, "utf8", (err, resp) => {
    if (err) {
      console.error(`${err}`);
      return;
    } else {
      handleOutput(resp, outLoc);
    }
  });
}

// cat(argv[2]);
// 0 '/path/to/node'
// 1 '/path/to/step1.js'
// 2 input from user (path to file)

async function webCat(URL, outLoc) {
  // http://google.com
  try {
    let resp = await axios.get(URL);
    // console.log(resp);
    handleOutput(resp.data, outLoc);
  } catch (err) {
    console.error(err);
  }
}

// if --out follows your script name, take the next argument and use that as the path to write to.
if (argv[2] === "--out") {
  if (argv[4].slice(0, 4) === "http") {
    webCat(argv[4], argv[3]);
  } else {
    console.log("here");
    cat(argv[4], argv[3]);
  }
} else if (argv[2].slice(0, 4) === "http") {
  webCat(argv[2], false);
} else {
  cat(argv[2], false);
}

// $node step3.js --out new.txt one.txt
// $# no output, but new.txt contains contents of one.txt

// $node step3.js --out new.txt  http://google.com
// $# no output, but new.txt contains google's HTML
