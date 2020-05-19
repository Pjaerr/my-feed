import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CollectionComponent extends Component {
  @tracked activeCollection = this.args.collections[0];
  @tracked isRefreshBlocked = false;

  tabs = this.args.collections.map((collection, index) => {
    return {
      name: collection.name,
      index,
    };
  });

  @action setActiveCollection(index) {
    this.activeCollection = this.args.collections[index];
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
