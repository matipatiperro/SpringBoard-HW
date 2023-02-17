"use strict";

// function createInstructor(firstName, lastName) {
//   return {
//     firstName: firstName,
//     lastName: lastName,
//   };
// }
// Same keys and values ES2015
function createInstructor(firstName, lastName) {
  return {
    firstName,
    lastName,
  };
}

// var favoriteNumber = 42;
// var instructor = {
//   firstName: "Colt",
// };

// instructor[favoriteNumber] = "That is my favorite!";
// Computed Property Names ES2015
const favoriteNumber = 42;
const instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!",
};

// var instructor = {
//   firstName: "Colt",
//   sayHi: function () {
//     return "Hi!";
//   },
//   sayBye: function () {
//     return this.firstName + " says bye!";
//   },
// };

// Computed Property Names ES2015

const instructor1 = {
  firstName: "Colt",
  sayHi: () => "Hi!",
  sayBye() {
    return this.firstName + " says bye!";
  },
};

// Write a function which generates an animal object. The function should accepts 3 arguments:

// species: the species of animal (‘cat’, ‘dog’)
// verb: a string used to name a function (‘bark’, ‘bleet’)
// noise: a string to be printed when above function is called (‘woof’, ‘baaa’)

// const d = createAnimal("dog", "bark", "Woooof!")
// // {species: "dog", bark: ƒ}
// d.bark()  //"Woooof!"

function createAnimal(species, verb, sound) {
  const animalObj = {
    species,
    [verb]() {
      return this[sound]();
    },
    [sound]: () => console.log(sound),
  };
  return animalObj;
}
