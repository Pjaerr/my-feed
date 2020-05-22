import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class CollectionManagerService extends Service {
  get collections() {
    //Return data from localstorage if it exists
    const collections = window.localStorage.getItem("collections");

    if (collections) {
      return JSON.parse(collections);
    } else {
      return null;
    }
  }

  set collections(collections) {
    window.localStorage.setItem("collections", JSON.stringify(collections));
  }

  async refreshCollection(collectionName) {
    const collections = this.collections;

    //Loop through collections and refresh the data matching the collection with the name collectionName
    for (const collection of collections) {
      if (collection.name === collectionName) {
        //Here we go to the API with collection.feeds and check if there is an update.
        //Very basic MVP could be to just give the latest data even if it hasn't changed.
        //**The  backend would return sorted by most recent */

        const feeds = collection.feeds.join(",");

        /**
         * This would be prepended with API hostname in an ember adapter
         * const updatedItems = await fetch(`/api?feeds=${feeds}`);
         *
         *
         * collection.items = updatedItems;
         */

        collection.items.push({
          date: "Mon, 28 Feb 2020",
          description:
            "Every 10 years there is a changing of the guard in JavaScript. I think we have just started a period of accelerated change that could in future be regarded as the Third Age of JavaScript.",
          image: "https://www.swyx.io/og_image/writing/js-third-age.png",
          title: "The Third Age of JavaScript",
          url: "https://www.swyx.io/writing/js-third-age",
        });
        break;
      }
    }

    //Update local storage with the new collections
    this.collections = collections;

    //Return the updated collections so the caller doesn't need to access local storage.
    return collections;
  }

  async refreshAllCollections() {}
}
