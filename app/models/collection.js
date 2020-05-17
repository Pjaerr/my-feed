import Model, { attr } from "@ember-data/model";

export default class CollectionModel extends Model {
  @attr name;
  @attr feeds;
  @attr items;
}
