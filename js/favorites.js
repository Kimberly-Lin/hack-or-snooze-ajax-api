"use strict";
//Code Review: Don't update the DOM until getting the response from server. Should include await 
//Code Review: Terniary should not have side effects, change to normal if statement

//Add or remove favorite and change the display of the button
function handleFavoriteClick(evt) {
    toggleFavorite(evt);
    let clickedStoryId = $(evt.target).parent().attr("id");
    const clickedStory = getStoryFromStoryId(clickedStoryId);

    // Event listener gives a storyId of the clicked story
    // If clickedStory exists in currentUser favorites list, we want to call removeFavorite 
    // If clickedStory doesn't exist in currentUser favorites list, we want to call addFavorite
    // story instance will be the parameter for removeFavorite and addFavorite

    //Need to get story from event listener

    isStoryInFavorites(clickedStory) ? currentUser.removeFavorite(clickedStory) : currentUser.addFavorite(clickedStory);
}

//Event listener on the i's
$allStoriesList.on("click", "i", handleFavoriteClick)

//Code Review: Changed the toggleClass to include both options for toggle
/** Favorites toggle */
function toggleFavorite(evt) {
    $(evt.target).toggleClass("far fas");
}

/** Edit stories to favorited stories in HTML*/

//Pseudo-code: currentUser.favorites has all stories we want to populate
//loop through generateStoryMarkup and append to $favoriteStoriesList

//Code Review: .get() in 40 is turning jQuery object to vanilla DOM element, which is not needed. It's not buggy, but it's redundant
function createFavoriteStoryList() {
    let favoriteStories = currentUser.favorites;
    for (let story of favoriteStories) {
        const $storyHTML = generateStoryMarkup(story);
        $favoriteStoriesList.append($storyHTML.get());
    }
}

/** Event lisener to unhide favorited stories list when 
* "favorites" in nav bar is clicked */
$navFavorites.on("click", navFavoriteClick);

/**Check if story is in currentUser favorites list */
//Code Review: Return false at the end. Refactor to use some method.
function isStoryInFavorites(story) {
    // console.log("this is running and story is ",story);
    for (let favoritedStory of currentUser.favorites) {
        // console.log(story.storyId === favoritedStory.storyId);
        if (story.storyId === favoritedStory.storyId) {
            return true;
        }
    }
}