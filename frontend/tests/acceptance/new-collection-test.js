import { module, test } from "qunit";
import { visit, currentURL, click, fillIn, find } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | new collection", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /new-collection", async function (assert) {
    await visit("/new-collection");

    assert.equal(currentURL(), "/new-collection");

    //Name field exists
    assert.dom('label[for="name"]').exists();
    assert.dom('input[name="name"]').exists();

    //Add Feed field exists
    assert.dom('label[for="feed_url"]').exists();
    assert.dom('input[name="feed_url"]').exists();
    assert.dom('button[aria-label="add feed"]').exists();
  });

  test("Adding a new feed", async function (assert) {
    await visit("/new-collection");

    const addFeedInput = find('input[name="feed_url"]');

    const addFeedButton = find('button[aria-label="add feed"]');

    await fillIn(addFeedInput, "https://myexamplefeed.com/rss.xml");

    await click(addFeedButton);

    assert
      .dom(addFeedInput)
      .doesNotContainText("https://myexamplefeed.com/rss.xml");

    const removeFeedButton = find('button[aria-label="remove feed"]');

    assert.dom(removeFeedButton).exists();

    assert
      .dom(removeFeedButton.parentElement)
      .containsText("https://myexamplefeed.com/rss.xml");
  });

  test("Removing a feed", async function (assert) {
    await visit("/new-collection");

    await fillIn('input[name="feed_url"]', "https://myexamplefeed.com/rss.xml");

    await click('button[aria-label="add feed"]');

    const removeFeedButton = find('button[aria-label="remove feed"]');
    const feedsList = removeFeedButton.parentElement.parentElement;

    assert.equal(
      feedsList.childElementCount,
      1,
      "A new feed has been added to the list of feeds"
    );

    await click(removeFeedButton);

    assert.equal(
      feedsList.childElementCount,
      0,
      "The new feed has been removed from the list of feeds after clicking the remove button"
    );
  });
});
