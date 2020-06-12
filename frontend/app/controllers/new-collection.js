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

  @action addFeed() {
    //Could probably do some standard checking to see if this is a valid URL to catch easy stuff
    //Also check that the feed doesn't already exist within the feeds so we don't have duplicates
    //?Could also limit the number of feeds per collection in the MVP
    this.feeds = [...this.feeds, this.currentFeed];

    this.currentFeed = "";
  }

  @action removeFeed(feedToRemove) {
    this.feeds = this.feeds.filter((feed) => feed !== feedToRemove);
  }

  @action async createNewCollection() {
    this.isLoading = true;

    await this.collectionManager.createNewCollection({
      name: this.name,
      feeds: this.feeds,
    });

    this.isLoading = false;

    this.transitionToRoute("/");
  }
}
