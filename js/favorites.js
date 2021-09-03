"use strict";

//Add or remove favorite and change the display of the button
function handleFavoriteClick(evt) {
    // console.log("storyList.stories=",)
    //Create a variable favoritedStoryId with the id of the event listener
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

    /**Get story instance from storyId */
    function getStoryFromStoryId(storyId) {
        // Loop through storyList
        // For each object in that loop, compare story Ids
        // If true, return story
        for (let story of storyList.stories) {
            if (story.storyId === storyId) {
                return story;
            }
        }
    }