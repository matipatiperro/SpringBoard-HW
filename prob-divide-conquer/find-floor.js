// Write a function called findFloor which accepts a sorted array and a value x,
// and returns the floor of x in the array. The floor of x in an array is the
// largest element in the array which is smaller than or equal to x.
// If the floor does not exist, return -1.

function findFloor(arr, x) {
  let start = 0;
  let end = arr.length - 1;
  let index = Math.floor((start + end) / 2);

  while (start <= end) {
    if (arr[start] <= x && arr[start + 1] >= x) return arr[start];
    else if (arr[index] < x) {
      start = index;
      index = Math.floor((start + end) / 2);
    } else {
      end = index;
      index = Math.floor((start + end) / 2);
    }
  }
  return -1;
}

findFloor([1, 2, 8, 10, 10, 12, 19], 9); // 8

module.exports = findFloor;
