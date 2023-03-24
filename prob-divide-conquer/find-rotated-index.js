// Write a function called ***findRotatedIndex*** which accepts a rotated array of sorted numbers and an integer.
// The function should return the index of num in the array. If the value is not found, return -1.

// **Constraints**:
// Time Complexity: O(log N)

function findRotatedIndex(arr, target) {
  let inflection = findInflection(arr);
  let answer = 0;
  if (target >= arr[0] && target <= arr[inflection]) {
    answer = binSearch(arr, target, 0, inflection);
  } else {
    answer = binSearch(arr, target, inflection + 1, arr.length);
  }
  return answer;
}

function binSearch(arr, target, start, end) {
  let leftIndex = start;
  let rightIndex = end;

  while (leftIndex <= rightIndex) {
    if (target === leftIndex) return leftIndex;
    else if (arr[leftIndex] <= target) {
      leftIndex = Math.floor((leftIndex + rightIndex) / 2);
    } else {
      rightIndex = Math.floor((leftIndex + rightIndex) / 2);
    }
  }
  return -1;
}

function findInflection(arr) {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;
  while (leftIndex <= rightIndex) {
    //   leftIndex = Math.floor((leftIndex+rightIndex)/2)
    if (arr[leftIndex] > arr[leftIndex + 1]) {
      return leftIndex;
    } else if (
      arr[leftIndex] <= arr[Math.floor((leftIndex + rightIndex) / 2)]
    ) {
      leftIndex = Math.floor((leftIndex + rightIndex) / 2);
    } else {
      rightIndex = Math.floor((leftIndex + rightIndex) / 2);
    }
  }
  return leftIndex;
}

// console.log(findInflection([6, 7, 8, 9, 1, 2, 3, 4], 8)); // 2
console.log(findInflection([37, 44, 66, 102, 10, 22], 14));
module.exports = findRotatedIndex;
