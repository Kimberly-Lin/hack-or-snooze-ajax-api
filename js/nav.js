"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  //$allStoriesList.show();
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
  // $navMyStories.show();
  // $navSubmit.show();
  // $navFavorites.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Show story submit form on click on "submit" */
function navSubmitClick(evt) {
  console.debug("navSubmit", evt);
  //console.log("navstorysubmit");
  hidePageComponents();
  $addStoryForm.show();
  $allStoriesList.show();
}

$navSubmit.on("click", navSubmitClick);

/** Handles click on Favorite link in Navbar */

//Code Review: Calling favoriteStoryList should include $("i")
function navFavoriteClick() {
  //console.debug("handle favorite click");
  hidePageComponents();
  $favoriteStoriesList.empty();
  createFavoriteStoryList();
  $favoriteStoriesList.show();
  $("i").show();
}


