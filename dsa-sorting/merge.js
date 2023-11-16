// Given two sorted arrays, write a function called merge which accepts two *sorted* arrays and returns a new array with values from both arrays sorted.

// This function should run in O(n + m) time and O(n + m) space and should not modify the parameters passed to it.

function merge(arr1, arr2) {
  let sortedArr = [];
  let arr1Counter = 0;
  let arr2Counter = 0;
  while (arr1[arr1Counter] && arr2[arr2Counter]) {
    if (arr1[arr1Counter] < arr2[arr2Counter]) {
      sortedArr.push(arr1[arr1Counter]);
      arr1Counter++;
    } else {
      sortedArr.push(arr2[arr2Counter]);
      arr2Counter++;
    }
  }
  //   console.log(arr1Counter, arr2Counter)
  if (arr1[arr1Counter]) {
    sortedArr = sortedArr.concat(arr1.slice(arr1Counter));
  } else {
    sortedArr = sortedArr.concat(arr2.slice(arr2Counter));
  }

  return sortedArr;
}

// Implement the merge sort algorithm. Given an array, this algorithm will sort the values in the array. Here’s some guidance for how merge sort should work:

// - Break up the array into halves until you can compare one value with another
// - Once you have smaller sorted arrays, merge those with other sorted pairs until you are back at the full length of the array
// - Once the array is merged back together, return the merged (and sorted!) array
// - In order to implement this function, you’ll also need to implement a merge function that takes in two sorted arrays and returns a new sorted array.
// You implemented this function in the previous exercise, so use that function!
function mergeSort(arr) {
  if (arr.length < 2) return arr;
  let midpoint = Math.floor(arr.length / 2);

  return merge(
    mergeSort(arr.slice(0, midpoint)),
    mergeSort(arr.slice(midpoint))
  );
}

module.exports = { merge, mergeSort };
