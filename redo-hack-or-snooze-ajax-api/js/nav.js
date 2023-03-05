"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  // $navLoggedInSection.show();
  $navLoggedInSection.toggleClass("hidden");
  $navUserProfile.text(`${currentUser.username}`).show();
  $loginForm.hide();
  $signupForm.hide();
}

function navShowForm() {
  $submitForm.toggleClass("hidden");
  // $submitForm.toggleClass("nav-selected");
}
$navSubmit.on("click", navShowForm);

function navShowFavorites() {
  putFavoritesOnPage();

  if (!$($submitForm).hasClass("hidden")) {
    $submitForm.toggleClass("hidden");
  }
  // $navFavorites.toggleClass("nav-selected");
}
$navFavorites.on("click", navShowFavorites);
