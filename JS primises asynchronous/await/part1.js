// ## ****Part 1: Number Facts****

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the ***json*** query key, specific to this API. [Details](http://numbersapi.com/#json).
// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

//     *(Note: You’ll need to make multiple requests for this.)*

//first
let baseURL = "http://numbersapi.com/";
let num = 5;

async function first() {
  let resp = await $.getJSON(`${baseURL}${num}?json`);
  console.log(resp);
}
// first();

//second
let nums = [4, 5, 6];
async function second() {
  let resp = await $.getJSON(`${baseURL}${nums}?json`);
  console.log(resp);
  //   for (num of resp) {
  //     console.log(num);
  //   }
}
// second();

//third

async function third() {
  let len = 4;
  let answer = await Promise.all(
    Array.from({ length: len }, function fill() {
      return $.getJSON(`${baseURL}${num}?json`);
    })
  );
  //   console.log(answer);
  answer.forEach((item) => {
    $("body").append(`<p>${item.text}</p>`);
  });
}
third();
