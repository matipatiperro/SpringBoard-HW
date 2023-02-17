"use strict";

// Quick Question #1
// What does the following code return?

// new Set([1,1,2,2,3,4])
// ANSWER: it will create a new set meaning duplicates removed - {1,2,3,4}

//////////
// Quick Question #2
// What does the following code return?

// [...new Set("referee")].join("")
// ANSWER: ref of type string

///////////
// Quick Questions #3
// What does the Map m look like after running the following code?

// let m = new Map();
// m.set([1,2,3], true);
// m.set([1,2,3], false);
// ANSWER: {[1,2,3]: true, [1,2,3]: false} - note, this is because references for the arrays are different

/////////
// Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate

// hasDuplicate([1,3,2,1]) // true
// hasDuplicate([1,5,-1,4]) // false

// function hasDuplicate(arr) {
//   return new Set(arr).size !== arr.length;
// }
// ANSWER: const hasDuplicate = (arr) => new Set(arr).size !== arr.length;

/////////
// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

// vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
// vowelCount('Colt') // Map { 'o' => 1 }
function vowelCount(word) {
  const letterCount = new Map();
  for (let letter of word) {
    if (letterCount.has(letter))
      letterCount.set(letter, letterCount.get(letter) + 1);
    else letterCount.set(letter, 1);
  }
  return letterCount;
}

// function vowelCount(word) {
//     const letterCount = {}
//     for(let letter of word) {
//         if(letterCount[letter]) letterCount[letter]++
//         else letterCount[letter]=1
//     }
//     return letterCount
// }
