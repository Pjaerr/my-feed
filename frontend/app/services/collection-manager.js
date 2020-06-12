import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class CollectionManagerService extends Service {
  get collections() {
    //Return data from localstorage if it exists. Possible improvement to avoid localstorage synchronous overhead would be to store the collections in local storage and in a local tracked variable and then only go to localstorage if that tracked variable is empty (which would be the case if the user reloaded the page for example).
    const collections = window.localStorage.getItem("collections");

    if (collections) {
      return JSON.parse(collections);
    } else {
      return [];
    }
  }

  set collections(collections) {
    window.localStorage.setItem("collections", JSON.stringify(collections));
  }

  //! Make sure collection name doesn't already exist when creating a new collection
  async createNewCollection({ name, feeds }) {
    //First check if this.collectionManager.collections is empty. If it is, set it to an empty array.
    //Then loop through the collections and add a new one with all of the information (mock for now)

    const latestItems = await this.getLatestItems(feeds);

    let items = [];

    latestItems.forEach((feed) => {
      feed.items.forEach((item) => items.push(item));
    });

    // this.collections = [...this.collections, { name, feeds, items }];
    this.set("collections", [...this.collections, { name, feeds, items }]);
  }

  async getLatestItems(feeds) {
    const latestItemsJson = await fetch(
      `http://localhost:8080/api/get?feeds=${feeds.join(",")}`
    );

    const latestItems = await latestItemsJson.json();

    return latestItems;
  }

  async refreshCollection(collectionName) {
    for (const collection of this.collections) {
      if (collection.name === collectionName) {
        const latestItems = await this.getLatestItems(
          collection.feeds.join(",")
        );

        let updatedItems = [];

        latestItems.forEach((feed) => {
          feed.items.forEach((item) => updatedItems.push(item));
        });

        collection.items = updatedItems;

        break;
      }
    }
  }

  async refreshAllCollections() {
    const collections = this.collections;

    //Loop through collections and refresh the data matching the collection with the name collectionName
    for (const collection of collections) {
      //Here we go to the API with collection.feeds and check if there is an update.
      //Very basic MVP could be to just give the latest data even if it hasn't changed.
      //**The  backend would return sorted by most recent */

      const deduplicatedFeeds = new Set();

      collection.feeds.forEach((feed) => deduplicatedFeeds.add(feed));

      let feeds = "";

      for (const feed of deduplicatedFeeds.keys()) {
        feeds += `,${feed}`;
      }

      /**
       * This would be prepended with API hostname in an ember adapter
       * const updatedItems = await fetch(`/api?feeds=${feeds}`);
       *
       *
       * collection.items = updatedItems;
       */

      collection.items.push({
        date: "Mon, 1 Mar 2020",
        description:
          "Every 10 years there is a changing of the guard in JavaScript. I think we have just started a period of accelerated change that could in future be regarded as the Third Age of JavaScript.",
        image: "https://www.swyx.io/og_image/writing/js-third-age.png",
        title: "The Third Age of JavaScript",
        url: "https://www.swyx.io/writing/js-third-age",
      });
    }

    //Update local storage with the new collections
    this.collections = collections;

    //Return the updated collections so the caller doesn't need to access local storage.
    return collections;
  }
}
