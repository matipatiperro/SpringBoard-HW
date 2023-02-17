"use strict";

// ## **Part Two - Movies App!**

// Build an application that uses jQuery to do the following:

// - Contains a form with two inputs for a title and rating along with a button to submit the form.
// - When the form is submitted, capture the values for each of the inputs and append them to the DOM along with a button to remove each title and rating from the DOM.
// - When the button to remove is clicked, remove each title and rating from the DOM.
let counter = 0;
$(".movie-form").submit(function (event) {
  event.preventDefault();
  const title = $("#title").val();
  const rating = $("#rating").val();
  counter++;
  add(title, rating, counter);
  $("#title").val("");
  $("#rating").val("");
});

function add(title, rating, counter) {
  $("form").after(
    `<div class=movie${counter}>movie title ${title} was given a rating of ${rating}</div>`
  );
  $(`.movie${counter}`).append("<button>remove</button>");
}

$(document).on("click", "button", function () {
  $(this).closest("div").remove();
});
