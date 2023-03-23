"use strict";

let score = 0;
let words = new Set();
let secs = 60;
// timer = setInterval(tick, 1000);

async function logSubmit(event) {
  //   console.log("event");
  event.preventDefault();
  const $word = $("#word");
  let word = $word.val();
  console.log(word);

  // check server for validity
  const resp = await axios.get("/check", { params: { word: word } });
  if (resp.data.result === "not-word") {
    console.log("not a valid English word");
    showMessage(`${word} is not a valid English word`, "err");
  } else if (resp.data.result === "not-on-board") {
    console.log(`${word} is not a valid word on this board`);
    showMessage(`${word} is not a valid word on this board`, "err");
  } else {
    console.log(`Added: ${word}`);
    showWord(word);
    score += word.length;
    showScore();
    words.add(word);
    showMessage(`Added: ${word}`, "ok");
  }
  console.log(resp);
}

$(".submit-word-form").on("submit", logSubmit);

/* show a status message */

function showMessage(msg, cls) {
  $(".msg").text(msg).removeClass().addClass(`msg ${cls}`);
}

function showWord(word) {
  $(".words").append($("<li>", { text: word }));
}

/* show score in html */

function showScore() {
  $(".score").text(score);
}

// async handleSubmit(evt) {
//     evt.preventDefault();
//     const $word = $(".word", this.board);

//     let word = $word.val();
//     if (!word) return;

//     if (this.words.has(word)) {
//       this.showMessage(`Already found ${word}`, "err");
//       return;
//     }

//     // check server for validity
//     const resp = await axios.get("/check-word", { params: { word: word }});
//     if (resp.data.result === "not-word") {
//       this.showMessage(`${word} is not a valid English word`, "err");
//     } else if (resp.data.result === "not-on-board") {
//       this.showMessage(`${word} is not a valid word on this board`, "err");
//     } else {
//       this.showWord(word);
//       this.score += word.length;
//       this.showScore();
//       this.words.add(word);
//       this.showMessage(`Added: ${word}`, "ok");
//     }

//     $word.val("").focus();
//   }
