// Given a sorted array and a number, write a function called ***sortedFrequency***
// that counts the occurrences of the number in the array

// **Constraints**:
// Time Complexity: O(log N)

function sortedFrequency(arr, target) {
  let leftMost = 0;
  let rightMost = arr.length - 1;
  let leftDif = 0;

  while (arr[leftMost] !== target) {
    if (arr[Math.floor((leftMost + rightMost) / 2)] < target) {
      leftMost = Math.floor((leftMost + rightMost) / 2) + 1;
    } else if (arr[Math.floor((leftMost + rightMost) / 2)] >= target) {
      rightMost = Math.floor((leftMost + rightMost) / 2) - 1;
    }
    if (leftMost === arr.length) return -1;
  }
  console.log(leftMost);
  leftDif = leftMost;
  rightMost = arr.length - 1;
  leftMost = 0;
  while (arr[rightMost] !== target) {
    if (arr[Math.floor((leftMost + rightMost) / 2)] <= target) {
      leftMost = Math.floor((leftMost + rightMost) / 2) + 1;
    } else if (arr[Math.floor((leftMost + rightMost) / 2)] > target) {
      rightMost = Math.floor((leftMost + rightMost) / 2) - 1;
    }
  }
  console.log(rightMost);
  return rightMost - leftDif + 1;
}
console.log("answer");
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)); // 4
console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3));
// console.log(sortedFrequency([1,1,2,2,2,2,3],1)) // 2
// console.log(sortedFrequency([1,1,2,2,2,2,3],4)) // -1
module.exports = sortedFrequency;
