import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CollectionsComponent extends Component {
  @service collectionManager;
  @tracked collections = this.collectionManager.collections;
  @tracked activeTab = 0;
  tabs = [];

  constructor(...args) {
    super(...args);

    this.tabs = this.collections.map(({ name }, index) => {
      return {
        name,
        index,
      };
    });
  }

  get activeCollection() {
    return this.collections[this.activeTab];
  }

  @action onTabChange(tabIndex) {
    this.activeTab = tabIndex;
  }

  @action async onTabRefresh() {
    //TODO: Block the refresh functionality so user can't easily spam.
    this.collections = await this.collectionManager.refreshCollection(
      this.activeCollection.name
    );
  }
}
