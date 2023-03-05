"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  // console.log(storyList);
  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let isFavorited = "";
  if (currentUser) {
    isFavorited = '<i class="fa fa-star"></i>';
    // console.log(currentUser.favorites);
    // console.log(currentUser.favorites.length);
    currentUser.favorites.forEach(function (s) {
      if (s.storyId === story.storyId) {
        isFavorited = '<i class="fa fa-star checked"></i>';
      }
    });
  }
  let trashIcon = "";
  if (myStoriesTab) {
    trashIcon = '<i class="fas fa-trash-alt"></i>';
  }

  // console.log(isFavorited);
  // if (currentUser.favorites.some((s) => s.storyId === story.storyId)) {
  //   // this story has been favorited
  //   isFavorited = '<i class="fa fa-star checked"></i>';
  // }

  return $(`
      <li id="${story.storyId}">
        <div>
          <span class="star">
           ${isFavorited}
          </span>
          <span class="trash-can">
            ${trashIcon}
          </span>
        
          <a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
        </li>
      </div>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  myStoriesTab = false;

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  // console.log($allStoriesList);
  $allStoriesList.show();
}
$navHome.on("click", putStoriesOnPage);

function putFavoritesOnPage() {
  myStoriesTab = false;
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  // console.log($allStoriesList);
  // $allStoriesList.show();
}
$navFavorites.on("click", putFavoritesOnPage);

function putMyStoriesOnPage() {
  myStoriesTab = true;
  $allStoriesList.empty();
  // console.log(currentUser);
  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  // console.log($allStoriesList);
  // $allStoriesList.show();
}
$navMyStories.on("click", putMyStoriesOnPage);

async function submitForm(e) {
  e.preventDefault();

  const storyTitle = $submitFormTitle.val();
  const storyAuthor = $submitFormAuthor.val();
  const storyURL = $submitFormURL.val();

  const newStory = {
    title: storyTitle,
    author: storyAuthor,
    url: storyURL,
  };
  const storyToAdd = await storyList.addStory(currentUser, newStory);

  // console.log("yyyo2");
  getAndShowStoriesOnStart();

  $submitFormTitle.val("");
  $submitFormAuthor.val("");
  $submitFormURL.val("");

  $submitForm.toggleClass("hidden");
}

$submitForm.on("submit", submitForm);

async function toggleFavoriteStory(e) {
  // console.log(e);

  const $target = $(e.target);
  const $closestI = $target.closest("i");
  $closestI.toggleClass("checked");

  const $storyID = $target.closest("li").attr("id");
  console.log($storyID);
  // add favorite, graphic and to user.favorite and server
  if ($closestI.hasClass("checked")) {
    // story has been favorited, send POST request
    await currentUser.addFavorite($storyID);
  }
  // remove favorite, from graphic and from user.favorite and server
  if (!$closestI.hasClass("checked")) {
    // story has been favorited, send POST request
    await currentUser.removeFavorite($storyID);
  }
}

$allStoriesList.on("click", ".star", toggleFavoriteStory);

async function removeStory(e) {
  // console.log(e);

  const $target = $(e.target);

  const $storyID = $target.closest("li").attr("id");
  console.log($storyID);

  // remove my story, from tab and from user.ownStories and server
  let response = await currentUser.removeMyStory($storyID);
  console.log(response);
  // currentUser.ownStories;
  putMyStoriesOnPage();
}
$allStoriesList.on("click", ".trash-can", removeStory);
