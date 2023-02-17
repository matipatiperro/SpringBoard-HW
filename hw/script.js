"use strict";

// let list = document.querySelector("ol");

// for (let item of list.children) {
//   item.style.backgroundColor = "green";
// }

// let footer = document.querySelector(".footer");
// footer.remove();

// const removeButtons = document.querySelectorAll("li button");

// for (let btn of removeButtons) {
//   btn.addEventListener("click", function () {
//     console.log("clicked button");
//     console.log(btn.parentNode);
//     btn.parentNode.remove();
//   });
// }
const listCont = document.querySelector("#to-do-list");
const textBox = document.querySelector("#to-do-item");
const storageArr = [];

// create list item function
const createLI = function (text) {
  const newItem = document.createElement("li");
  newItem.textContent = text;
  listCont.append(newItem);
};

// check local storage for list items and add to page, runs on refresh
if (localStorage.theList) {
  let parcedArr = JSON.parse(localStorage.theList);
  for (let li of parcedArr) {
    createLI(li);
  }
}

// update the storage list data
const updateList = function () {
  storageArr.length = 0;
  for (let li of listCont.getElementsByTagName("li")) {
    storageArr.push(li.innerText);
  }
  console.log(storageArr);
};

const updateLocalStorage = function (list) {
  localStorage.setItem("theList", JSON.stringify(list));
};

// on form submit, add a list item
const form = addEventListener("submit", function (e) {
  e.preventDefault();
  if (textBox.value === "") return;

  createLI(textBox.value);
  updateList();
  updateLocalStorage(storageArr);

  textBox.value = "";
});

// on click of a list item, strikethrough, or if already stuck through, remove it
// update storage list
listCont.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    if (e.target.classList.value.includes("addStrikeThrough")) {
      localStorage.removeItem("theList");
      e.target.remove();
      updateList();
      updateLocalStorage(storageArr);
    }
    e.target.classList.add("addStrikeThrough");
  }
});
