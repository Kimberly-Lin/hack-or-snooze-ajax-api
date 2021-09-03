"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

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
  return $(`
      <li id="${story.storyId}">
        <i class="far fa-thumbs-up hidden"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  if (currentUser) $("i").show();
}

/** Gets data from story submit form and adds new story to the page*/
// get data from submit form
// call .addStory
// append to storyList

// Event listener for form submission

async function addNewStoryToPage(evt) {
  evt.preventDefault();
  const author = $("#new-author").val();
  const title = $("#new-title").val();
  const url = $("#new-url").val();
  if (!author || !title || !url) {
    return;
  }
  const newStory = { author, title, url };
  const response = await storyList.addStory(currentUser, newStory);
  const $story = generateStoryMarkup(response);
  $allStoriesList.prepend($story.get());
  //refactor here, dont call getStories and putStoriesOnPage --> can use generateStoryMarkup and prepend
  // storyList = await StoryList.getStories();
  // putStoriesOnPage();
}

$addStoryForm.on("submit", addNewStoryToPage);

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