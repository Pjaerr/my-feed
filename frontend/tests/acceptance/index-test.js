import { module, test } from "qunit";
import { visit, currentURL, find, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | feed test", function (hooks) {
  setupApplicationTest(hooks);

  test("Visiting / without existing collections", async function (assert) {
    localStorage.clear();

    await visit("/");

    assert.equal(currentURL(), "/");

    assert.dom('button[aria-label="menu"]').exists();

    assert.dom('a[href="/new-collection"]').hasText("Start a new collection");

    assert.dom('a[href="/browse"]').hasText("Browse user curated collections");
  });

  test("visiting / with existing collections", async function (assert) {
    /*Clear localstorage and then create a new collection using the collection-manager service*/

    localStorage.clear();

    const collectionManager = this.owner.lookup("service:collection-manager");

    collectionManager.collections = [
      {
        name: "Frontend",
        feeds: [
          "https://joshuaj.co.uk/rss.xml",
          "https://joshwcomeau.com/rss.xml",
        ],
        items: [
          {
            title: "Building a Desktop App using Svelte and Electron",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url:
              "https://joshuaj.co.uk/blog/building-desktop-app-svelte-electron",
            date: "Sat, 22 Feb 2020",
          },
          {
            title: "Lessons Learned Speaking at Conferences",
            image:
              "https://joshwcomeau.com/images/og-lessons-learned-speaking-at-conferences.png",
            description:
              "This post was originally published on Medium in August 2018. I've rewritten it to include stuff I've learned since, and discuss how the COVID-19 pandemic affects it all.",
            url:
              "https://joshwcomeau.com/blog/lessons-learned-speaking-at-conferences",
            date: "Fri, 6 May 2020",
          },
          {
            title: "Lets Create: A Data Visualization using Svelte",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url:
              "https://joshuaj.co.uk/blog/building-desktop-app-svelte-electron",
            date: "Sat, 22 Feb 2020",
          },
        ],
      },
      {
        name: "Design",
        feeds: [
          "https://joshuaj.co.uk/rss.xml",
          "https://joshwcomeau.com/rss.xml",
        ],
        items: [
          {
            title: "Test Item",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url: "https://joshuaj.co.uk/",
            date: "Sat, 22 Feb 2020",
          },
        ],
      },
      {
        name: "Career",
        feeds: [
          "https://joshuaj.co.uk/rss.xml",
          "https://joshwcomeau.com/rss.xml",
        ],
        items: [
          {
            title: "Test Item",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url: "https://joshuaj.co.uk/",
            date: "Sat, 22 Feb 2020",
          },
        ],
      },
    ];

    await visit("/");
    assert.equal(currentURL(), "/");

    assert.dom('button[aria-label="menu"]').exists();

    //Do the collection tabs exist
    const collectionTabs = find('nav[aria-label="Collection navigation"]');
    assert.dom(collectionTabs).exists();

    //Does clicking the career tab change the feed content
    const tabs = [...collectionTabs.querySelectorAll("ul > li > button")];

    //Get the career tab
    let careerTab;

    tabs.forEach((tab) => {
      //Remove whitespace and new lines
      const tabTextContent = tab.textContent.replace(/\n/g, "").trim();

      //Store the career tab for the below assertion
      if (tabTextContent === "Career") {
        careerTab = tab;
      }
    });

    const feed = find("section > ul");

    assert.equal(
      feed.querySelectorAll("li").length,
      5,
      "Expect number of feed items to be 5 whilst on the All tab"
    );

    await click(careerTab);

    assert.equal(
      feed.querySelectorAll("li").length,
      1,
      "Expect number of feed items to be 1 after clicking on the Career tab"
    );
  });
});
