"use strict";

// 1. When the DOM is ready, console.log the message “Let’s get ready to party with jQuery!”
console.log("Let’s get ready to party with jQuery!");

// 2. Give all images inside of an article tag the class of image-center (this class is defined inside of the style tag in the head).
$("article img").addClass("image-center");

// 3. Remove the last paragraph in the article.
$("p").last().remove();

// 4. Set the font size of the title to be a random pixel size from 0 to 100.
$("h1").css({ "font-size": Math.floor(Math.random() * 100) });

// 5. Add an item to the list; it can say whatever you want.
$("ol").first().append("<li>whatever you want</li>");

// 6. Scratch that; the list is silly. Empty the aside and put a paragraph in it apologizing for the list’s existence.
$("ol").first().remove();
$("aside h4").remove();
$("aside").append(
  "<p>Lists are silly. New paragraph in its place and apologies for the list’s existence.</p>"
);

// 7. When you change the numbers in the three inputs on the bottom, the background color of the body should change to match whatever the three values in the inputs are.
$(".form-control").on("input", function () {
  const rVal1 = $(".form-control").get(0).value;
  const rVal2 = $(".form-control").get(1).value;
  const rVal3 = $(".form-control").get(2).value;
  $("body").css({ backgroundColor: `rgb(${rVal1}, ${rVal2}, ${rVal3})` });
});

// 8. Add an event listener so that when you click on the image, it is removed from the DOM.
$("img").click(function () {
  $("img").remove();
});
