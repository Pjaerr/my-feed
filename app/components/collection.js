import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CollectionComponent extends Component {
  @tracked activeCollection = this.args.collections[0];

  tabs = this.args.collections.map((collection, index) => {
    return {
      name: collection.name,
      index,
    };
  });

  @action setActiveCollection(index) {
    this.activeCollection = this.args.collections[index];
  }
}
