"use strict";

const upperText = document.querySelector("#upper-text");
const lowerText = document.querySelector("#lower-text");
const urlText = document.querySelector("#meme-url");
const formBtn = document.querySelector("#memeGenForm");
const memeSection = document.querySelector(".meme-area");

const createMeme = function () {
  const newMeme = document.createElement("div");
  const memeUpperText = document.createElement("h3");
  const memeImage = document.createElement("img");
  const memeLowerText = document.createElement("h3");
  const removeBtn = document.createElement("Button");

  newMeme.classList.add("new-meme-div");
  memeUpperText.classList.add("new-meme-upperText");
  memeLowerText.classList.add("new-meme-lowerText");

  memeUpperText.innerText = upperText.value;
  memeLowerText.innerText = lowerText.value;
  memeImage.src = urlText.value;
  memeImage.alt = "url might not be valid";
  memeImage.style.width = "15rem";
  removeBtn.innerText = "delete meme";
  removeBtn.style.marginBottom = "4rem";

  newMeme.appendChild(memeUpperText);
  newMeme.appendChild(memeImage);
  newMeme.appendChild(memeLowerText);
  newMeme.appendChild(removeBtn);

  removeBtn.addEventListener("click", function (e) {
    newMeme.remove();
  });
  return newMeme;
};

formBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  if (upperText.value === "" && lowerText.value === "" && urlText.value === "")
    return;

  const newMeme = createMeme();
  memeSection.appendChild(newMeme);
});

// https://images.unsplash.com/photo-1587402092301-725e37c70fd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80
