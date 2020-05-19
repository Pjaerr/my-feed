import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CollectionTabsComponent extends Component {
  @tracked isRefreshBlocked = false;

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
