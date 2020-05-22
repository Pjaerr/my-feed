import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class IndexRoute extends Route {
  @service collectionManager;

  async model() {
    return this.collectionManager.collections;
  }
}
