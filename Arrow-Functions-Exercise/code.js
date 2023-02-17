// function double(arr) {
//     return arr.map(function(val) {
//       return val * 2;
//     });
//   }

// Refactor the above code to use two arrow functions. Turn it into a one-liner.

function double1(arr) {
  return arr.map((val) => val * 2);
}
console.log(double1([3, 2, 1]));

const double2 = (arr) => {
  return arr.map((val) => val * 2);
};
console.log(double2([3, 2, 1]));

const double = (arr) => arr.map((val) => val * 2);
console.log(double([3, 2, 1]));

// Replace ALL functions with arrow functions:

// function squareAndFindEvens(numbers){
//   var squares = numbers.map(function(num){
//     return num ** 2;
//   });
//   var evens = squares.filter(function(square){
//     return square % 2 === 0;
//   });
//   return evens;
// }

const squareAndFindEvens = (numbers) => {
  const squares = numbers.map((num) => num ** 2);
  const evens = squares.filter((square) => square % 2 === 0);
  return evens;
};
