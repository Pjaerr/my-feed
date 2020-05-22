import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CollectionsComponent extends Component {
  @service collectionManager;
  @tracked collections;
  @tracked activeTab = 0;
  @tracked isRefreshBlocked = false;
  tabs = [];

  constructor(...args) {
    super(...args);

    this.setCollections(this.collectionManager.collections);

    this.tabs = this.collections.map(({ name }, index) => {
      return {
        name,
        index,
      };
    });
  }

  /**
   * Update the collections local to this component, prepending an "All"
   * collection that shows all of the items from each respective collection.
   *
   * @param {{name: string, feeds: [], items: []}[]} collections
   */
  setCollections(collections) {
    const allCollections = {
      name: "All",
      feeds: [],
      items: [],
    };

    for (const { feeds, items } of collections) {
      allCollections.feeds = [...allCollections.feeds, ...feeds];
      allCollections.items = [...allCollections.items, ...items];
    }

    this.collections = [allCollections, ...collections];
  }

  get activeCollection() {
    return this.collections[this.activeTab];
  }

  @action onTabChange(tabIndex) {
    this.activeTab = tabIndex;
  }

  @action async onTabRefresh() {
    if (this.isRefreshBlocked) {
      return;
    }

    this.isRefreshBlocked = true;

    let updatedCollections;

    if (this.activeTab === 0) {
      //Refresh all collections
      updatedCollections = await this.collectionManager.refreshAllCollections();
    } else {
      //Refresh the active collection
      updatedCollections = await this.collectionManager.refreshCollection(
        this.activeCollection.name
      );
    }

    this.setCollections(updatedCollections);

    //Let the user use the refresh button after REFRESH_COOLDOWN has passed
    const REFRESH_COOLDOWN = 60000;

    setTimeout(() => {
      this.isRefreshBlocked = false;
    }, REFRESH_COOLDOWN);
  }
}
