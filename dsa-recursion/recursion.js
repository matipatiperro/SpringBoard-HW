/** product: calculate the product of an array of numbers. */
// Write a function that finds the product of an array of numbers:
// product([2, 3, 4])   // 24
function product(nums) {
  // console.log(nums[0]);
  if (nums.length == 1) return nums[0];
  if (nums.length > 1) {
    return nums[0] * product(nums.slice(1));
  }
}

/** longest: return the length of the longest word in an array of words. */
// Given a list of words, return the length of the longest:
// longest(["hello", "hi", "hola"])  // 5
function longest(words) {
  let longestWord = words[0].length;
  if (words.length === 1) return longestWord;
  if (longestWord > longest(words.slice(1))) {
    return longestWord;
  } else {
    longestWord = longest(words.slice(1));
  }
  return longestWord;
}

/** everyOther: return a string with every other letter. */
// Write a function that returns a string of every other character:
// everyOther("hello")  // "hlo"
function everyOther(str) {
  let rtnStr = "";
  if (str.slice(2)) {
    rtnStr += str[0] + everyOther(str.slice(2));
  } else {
    rtnStr += str[0];
  }

  return rtnStr;
}

/** isPalindrome: checks whether a string is a palindrome or not. */
// Write a function that returns true/false depending on whether passed-in string is a palindrome:
// isPalindrome("tacocat")  // true
// isPalindrome("tacodog")  // false
function isPalindrome(str) {
  let rtnVal = true;
  if (str[0] === str[str.length - 1]) {
    // console.log(str[0] )
    // console.log(str[str.length-1])

    if (str.length > 1) {
      rtnVal = isPalindrome(str.slice(1, str.length - 1));
    } else {
      return;
    }
  } else {
    rtnVal = false;
    return rtnVal;
  }
  if (rtnVal === undefined) return true;
  return rtnVal;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */
// Given an array and a string, return the index of that string in the array (or -1 if not present):
// let animals = ["duck", "cat", "pony"];
// findIndex(animals, "cat");  // 1
// findIndex(animals, "porcupine");   // -1
function findIndex(arr, val) {
  let index = 0;
  if (arr.length === 0) return 0;
  if (arr[0] === val) return index;
  else {
    index = 1 + findIndex(arr.slice(1), val);
  }
  if (index === arr.length) return undefined;
  return index;
}

// 1 + ["cat", "pony","dog"]
// 1 + 1 + ["pony","dog"]
// 1 + 1 + 1 + ["dog"]
// 1 + 1 + 1 + 1 + undefined

/** revString: return a copy of a string, but in reverse. */
// Return a copy of a string, reversed:
// revString("porcupine") // 'enipucrop'
function revString(str) {
  let rtnStr = "";
  if (str.length > 1) {
    rtnStr =
      str[str.length - 1] + revString(str.slice(1, str.length - 1)) + str[0];
  } else if (str.length === 1) {
    return str;
  } else {
    return rtnStr;
  }
  return rtnStr;
}

/** gatherStrings: given an object, return an array of all of the string values. */

// let nestedObj = {
//   firstName: "Lester",
//   favoriteNumber: 22,
//   moreData: {
//     lastName: "Testowitz"
//   },
//   funFacts: {
//     moreStuff: {
//       anotherNumber: 100,
//       deeplyNestedString: {
//         almostThere: {
//           success: "you made it!"
//         }
//       }
//     },
//     favoriteString: "nice!"
//   }
// };
// gatherStrings(nestedObj) // ["Lester", "Testowitz", "you made it!", "nice!"];
// Given an object, return an array of all the values in the object that are strings:
function gatherStrings(obj) {
  let answer = [];
  //   if (obj.length === 0) return;
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      // console.log(obj[key]);
      answer.push(obj[key]);
    }
    if (typeof obj[key] === "object") {
      // console.log(obj[key])
      answer.push(...gatherStrings(obj[key]));
    }
  }
  return answer;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch,
};
