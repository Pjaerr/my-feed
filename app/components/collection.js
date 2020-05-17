import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CollectionComponent extends Component {
  @tracked activeCollection;
  tabs = [];

  constructor(...args) {
    super(...args);

    this.activeCollection = this.args.collections.objectAt(0);

    this.args.collections.forEach((collection, index) => {
      this.tabs.push({
        name: collection.name,
        index,
      });
    });
  }

  @action setActiveCollection(index) {
    this.activeCollection = this.args.collections.objectAt(index);
  }
}
