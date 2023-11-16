// - Loop with ***i*** from end of array towards beginning
//     - Loop with ***j*** from the beginning until ***i - 1***
//     - If ***arr[j]*** is greater than ***arr[j+1]***, swap those two values!
// - Return the sorted array

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

module.exports = bubbleSort;
