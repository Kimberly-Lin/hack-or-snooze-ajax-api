"use strict";

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

    for (let story of currentUser.favorites) {
        if (story === clickedStory)
        {
            currentUser.removeFavorite(clickedStory);
            return;
        }
    }
    currentUser.addFavorite(clickedStory);
}
    //Event listener on the i's
    $allStoriesList.on("click", "i", handleFavoriteClick)

/** Favorites toggle */
function toggleFavorite (evt){
    $(evt.target).toggleClass("far");
    $(evt.target).toggleClass("fas");
}

/** Edit stories to favorited stories in HTML*/
//const favoriteStoryList = new StoryList (currentUser.favorites);
function createFavoriteStoryList () {
    let favoriteStories = currentUser.favorites;
    for (let story of favoriteStories){
        const $storyHTML= generateStoryMarkup(story);
        $favoriteStoriesList.append($storyHTML.get());
    }
}

//currentUser.favorites has all stories we want to populate
//loop through generateStoryMarkup and append to $favoriteStoriesList

function navFavoriteClick(){
    console.debug("handle favorite click");
    hidePageComponents();
    $favoriteStoriesList.empty();
    createFavoriteStoryList();
    $favoriteStoriesList.show()
}

/** Event lisener to unhide favorited stories list when 
* "favorites" in nav bar is clicked */
$navFavorites.on("click", navFavoriteClick);