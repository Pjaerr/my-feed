import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class MenuComponent extends Component {
  @service collectionManager;
  @tracked isMenuOpen = false;

  @action toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (window.innerWidth < 1280) {
      if (this.isMenuOpen) {
        document.documentElement.classList.add("menu-open");
        document.body.classList.add("menu-open");
      } else {
        document.documentElement.classList.remove("menu-open");
        document.body.classList.remove("menu-open");
      }
    }
  }
}
