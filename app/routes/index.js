import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class IndexRoute extends Route {
  @service collectionManager;

  //Changed this. I was trying to force the ember-data stuff into this, where that might be useful for
  //a lot of other use cases, it didn't fit here when I just need data from local storage without specifying
  //a model and using it. I may just get better at _knowing_ things through practice.
  async model() {
    return this.collectionManager.getCollections();
  }
}
