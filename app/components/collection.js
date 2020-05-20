import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CollectionComponent extends Component {
  @tracked activeCollection = this.args.collections[0];
  @tracked isRefreshBlocked = false;
  collections = [];
  tabs = [];

  constructor(...args) {
    super(...args);

    //Loop through all of the collections and push all items into a collection called "All"
    const allCollections = {
      name: "All",
      feeds: [],
      items: [],
    };

    for (const collection of this.args.collections) {
      //Maybe we don't need this as feeds are for the refreshing process and this All collection is just local
      allCollections.feeds = [...allCollections.feeds, ...collection.feeds];

      allCollections.items = [...allCollections.items, ...collection.items];
    }

    this.collections = [allCollections, ...this.args.collections];

    console.log(this.collections);
    this.tabs = this.collections.map((collection, index) => {
      return {
        name: collection.name,
        index,
      };
    });
  }

  @action setActiveCollection(index) {
    this.activeCollection = this.collections[index];
  }

  @action refreshCollections() {
    if (!this.isRefreshBlocked) {
      //Refresh collections -- This would go to the API probably through a service

      console.log("Refreshing Collections");
      this.isRefreshBlocked = true;

      //The isAllowedToRefresh should probably be stored in local storage so the user can't just reload
      //the page to get what they want.
      setTimeout(() => {
        this.isRefreshBlocked = false;
      }, 60000);
    }
  }
}
