// Write a function called findRotationCount which accepts an array of distinct numbers sorted in
// increasing order. The array has been rotated counter-clockwise n number of times.
// Given such an array, find the value of n.

// **Constraints**:
// Time Complexity: O(log N)

function findRotationCount(arr) {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;
  while (leftIndex <= rightIndex) {
    if (arr[leftIndex] > arr[leftIndex + 1]) return leftIndex;
    else if (arr[leftIndex] > arr[rightIndex]) {
      console.log(leftIndex);
      leftIndex = Math.floor((leftIndex + rightIndex) / 2);
    } else {
      console.log(rightIndex);
      rightIndex = Math.floor((leftIndex + rightIndex) / 2);
    }
  }
  return leftIndex;
}

console.log(findRotationCount([15, 18, 2, 3, 6, 12])); // 2
findRotationCount([7, 9, 11, 12, 5]);
module.exports = findRotationCount;
