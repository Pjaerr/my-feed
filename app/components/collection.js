import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class CollectionComponent extends Component {
  @service collectionManager;

  @tracked activeCollection;
  @tracked isRefreshBlocked = false;
  @tracked collections = [];
  tabs = [];

  constructor(...args) {
    super(...args);

    //Loop through all of the collections and push all items into a collection called "All"
    const allCollections = {
      name: "All",
      feeds: [],
      items: [],
    };

    for (const { feeds, items } of this.args.collections) {
      allCollections.feeds = [...allCollections.feeds, ...feeds];
      allCollections.items = [...allCollections.items, ...items];
    }

    this.collections = [allCollections, ...this.args.collections];

    this.setActiveCollection(0);

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

  @action async refreshCollections() {
    if (!this.isRefreshBlocked) {
      this.isRefreshBlocked = true;

      //Refresh collections -- This would go to the API probably through a service
      //If "All" collection is open, just call this.collectionMananer.refreshAllCollections()
      const updatedCollections = await this.collectionManager.refreshCollection(
        this.activeCollection.name
      );

      this.collections = [this.collections[0], ...updatedCollections];

      //NEED TO RESET THIS.ACTIVECOLLECTION HERE SO THAT IT RE-RENDERS.
      //Failing that, need to figure a way to store activeCollection as just an index and then
      //yield this.collections[this.activeCollection].items instead.

      //The isAllowedToRefresh should probably be stored in local storage so the user can't just reload
      //the page to get what they want.
      setTimeout(() => {
        this.isRefreshBlocked = false;
      }, 60000);
    }
  }
}
