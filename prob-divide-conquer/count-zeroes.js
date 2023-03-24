// Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called
// ***countZeroes***, which returns the number of zeroes in the array.

// **Constraints**:
// Time Complexity: O(log N)

function countZeroes(arr) {
  let leftMost = 0;
  let rightMost = arr.length;
  while (leftMost < rightMost) {
    if (arr[Math.floor((rightMost + leftMost) / 2)] === 1) {
      leftMost = Math.floor((rightMost + leftMost) / 2) + 1;
    } else {
      rightMost = Math.floor((rightMost + leftMost) / 2);
    }
    //   console.log("leftMost", leftMost)
    //   console.log("rightMost", rightMost)
  }

  return arr.length - leftMost;
  //   return arr.length - arr.indexOf(0); // this is O(n) time
}

countZeroes([1, 1, 1, 1, 0, 0]); // 2
module.exports = countZeroes;
