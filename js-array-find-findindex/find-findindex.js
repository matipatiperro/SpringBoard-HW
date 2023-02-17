/* 
Write a function called `findUserByUsername` which accepts an array of objects, each with a key of username, and a string. The function should return the first object with the key of username that matches the string passed to the function. If the object is not found, return undefined. 

const users = [
  {username: 'mlewis'},
  {username: 'akagen'},
  {username: 'msmith'}
];

findUserByUsername(users, 'mlewis') // {username: 'mlewis'}
findUserByUsername(users, 'taco') // undefined
*/

function findUserByUsername(usersArray, username) {
  return usersArray.find(function (obj) {
    // console.log(Object.values(obj));
    if (username === Object.values(obj)[0]) return obj;
  });
}

/*
Write a function called `removeUser` which accepts an array of objects, each with a key of username, and a string. The function should remove the object from the array. If the object is not found, return undefined. 

const users = [
  {username: 'mlewis'},
  {username: 'akagen'},
  {username: 'msmith'}
];

removeUser(users, 'akagen') // {username: 'akagen'}
removeUser(users, 'akagen') // undefined
*/

function removeUser(usersArray, username) {
  const rowToRemove = usersArray.findIndex(function (row, index) {
    if (username === Object.values(row)[0]) return row;
  });
  return usersArray.filter(function (row, index) {
    if (index === rowToRemove) {
      usersArray.splice(index, 1); // 2nd parameter means remove one item only

      return row;
    }
  })[0];
}

// function removeUser(usersArray, username) {
//   const rowToRemove = usersArray.findIndex(function (row, index) {
//     if (username === Object.values(row)[0]) return row;
//   });
//   return usersArray.filter(function (row, index) {
//     if (index !== rowToRemove) return row;
//   });
// }
