import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class NewCollectionController extends Controller {
  @service collectionManager;

  @tracked name = "New Collection";
  @tracked currentFeed = "";
  @tracked feeds = [];

  @tracked isLoading = false;

  @action enterKeyPressed(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      this.addFeed();
    }
  }

  @action addFeed() {
    if (this.feeds.includes(this.currentFeed)) {
      return;
    }

    this.feeds = [this.currentFeed, ...this.feeds];

    this.currentFeed = "";
  }

  @action removeFeed(feedToRemove) {
    this.feeds = this.feeds.filter((feed) => feed !== feedToRemove);
  }

  @action async createNewCollection() {
    if (this.feeds.length <= 0) {
      return;
    }

    this.isLoading = true;

    await this.collectionManager.createNewCollection({
      name: this.name,
      feeds: this.feeds,
    });

    this.isLoading = false;

    this.transitionToRoute("/");
  }
}
