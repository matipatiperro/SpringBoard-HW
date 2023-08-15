/** Server startup for Message.ly. */
// to run the app, node server.js

const app = require("./app");

app.listen(3000, function () {
  console.log("Listening on 3000");
});
