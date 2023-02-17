"use strict";

// Object Destructuring 1
// What does the following code return/print?

// let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
// let {numPlanets, yearNeptuneDiscovered} = facts;

// console.log(numPlanets); // ? ANSWER: 8
// console.log(yearNeptuneDiscovered); // ? ANSWER: 1846

/////////////
// Object Destructuring 2
// What does the following code return/print?

// let planetFacts = {
//   numPlanets: 8,
//   yearNeptuneDiscovered: 1846,
//   yearMarsDiscovered: 1659
// };

// let {numPlanets, ...discoveryYears} = planetFacts;

// console.log(discoveryYears); // ? ANSWER: { yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659 }

///////////////
// Object Destructuring 3
// What does the following code return/print?

// function getUserData({firstName, favoriteColor="green"}){
//   return `Your name is ${firstName} and you like ${favoriteColor}`;
// }

// getUserData({firstName: "Alejandro", favoriteColor: "purple"}) // ? ANSWER: Your name is Alejandro and you like purple
// getUserData({firstName: "Melissa"}) // ? ANSWER: Your name is Melissa and you like green
// getUserData({}) // ? ANSWER: Your name is undefined and you like green

//////////
// Array Destructuring 1
// What does the following code return/print?

// let [first, second, third] = ["Maya", "Marisa", "Chi"];

// console.log(first); // ? ANSWER: Maya
// console.log(second); // ? ANSWER: Marisa
// console.log(third); // ? ANSWER: Chi

///////////////
// Array Destructuring 2
// What does the following code return/print?

// let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
//   "Raindrops on roses",
//   "whiskers on kittens",
//   "Bright copper kettles",
//   "warm woolen mittens",
//   "Brown paper packages tied up with strings"
// ]

// console.log(raindrops); // ? ANSWER: Raindrops on roses
// console.log(whiskers); // ? ANSWER: whiskers on kittens
// console.log(aFewOfMyFavoriteThings); // ? ANSWER: ["Bright copper kettles","warm woolen mittens","Brown paper packages tied up with strings"]

/////////////
// Array Destructuring 3
// What does the following code return/print?

// let numbers = [10, 20, 30];
// [numbers[1], numbers[2]] = [numbers[2], numbers[1]]

// console.log(numbers) // ? ANSWER: [10,30,20]

////////////
// var obj = {
//     numbers: {
//       a: 1,
//       b: 2
//     }
//   };

//   var a = obj.numbers.a;
//   var b = obj.numbers.b;

//   ES2015 Object Destructuring
// ANSWER: const {a:x,b:y} = obj.numbers

///////////////
// var arr = [1, 2];
// var temp = arr[0];
// arr[0] = arr[1];
// arr[1] = temp;

// ES2015 One-Line Array Swap with Destructuring
// ANSWER: [arr[1], arr[0]] = [arr[0], arr[1]];

////////////
// Write a function called raceResults which accepts a single array argument. It should return an object with the keys first, second, third, and rest.

// first: the first element in the array
// second: the second element in the array
// third: the third element in the array
// rest: all other elements in the array
// Write a one line function to make this work using
// An arrow function
// Destructuring
// ‘Enhanced’ object assignment (same key/value shortcut)
// raceResults(['Tom', 'Margaret', 'Allison', 'David', 'Pierre'])

/*
  {
    first: "Tom",
    second: "Margaret",
    third: "Allison",
    rest: ["David", "Pierre"]
  }
*/

// function raceResults(arr) {
//     return {first:arr[0], second: arr[1], third: arr[2], rest:[...arr.slice(3)]}
// }
// function raceResults([first, second, third, ...rest]) {
//   return { first, second, third, rest };
// }

// ANSWER
// const raceResults = ([first, second, third, ...rest]) => ({
//   first,
//   second,
//   third,
//   rest,
// });
