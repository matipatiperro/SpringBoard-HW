const fs = require("fs");
const argv = process.argv; // to take input from the command line

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`${err}`);
      return;
    }
    console.log(data);
  });
}

cat(argv[2]);
// 0 '/path/to/node'
// 1 '/path/to/step1.js'
// 2 input from user (path to file)
