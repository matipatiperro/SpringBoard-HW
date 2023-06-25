// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
// (Make sure you get back JSON by including the json query key, specific to this API. Details.

// let planet;
// $.getJSON("https://swapi.dev/api/planets/1/", response => { planet = response; });
// console.log(planet);

// The getJSON() method in jQuery fetches JSON-encoded data from the server using a GET HTTP request.
// The getJSON() method is used to get JSON data using an AJAX HTTP GET request.

// first question

// note, not good to have request not inside an async function with an await. could lock up the thread
let number = 5;
// let response;
let baseURL = "http://numbersapi.com";
$.getJSON(`${baseURL}/${number}?json`).then((response) => {
  console.log(response);
});

// console.log(`${baseURL}/${number}?json`);

// second question
let number2 = [5, 6, 7];
// let response;
async function secondQ() {
  await $.getJSON(`${baseURL}/${number2}?json`).then((response) => {
    console.log(response);
  });
}
secondQ();

// third question

// Generate a sequence of numbers
async function thirdQ() {
  let arr = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${number}?json`))
  );
  arr.forEach((data) => {
    $("body").append(`<p>${data.text}</p>`);
  });
}
thirdQ();

// do not use axios yet
// let baseURL = "https://pokeapi.co/api/v2/pokemon" ;
// axios.get(`${baseURL}/1/`).then(p1=>{console.log(`The first pokemon is ${p1.data.name}`);'
