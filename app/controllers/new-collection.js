import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class BlogPostController extends Controller {
  @service dataStorage;

  //This is temporary. The start new collection will eventually just be a <LinkTo> the relevant route
  @action startNewCollection() {
    this.dataStorage.setCollections([
      {
        name: "Test Collection",
        feeds: [
          "https://joshuaj.co.uk/rss.xml",
          "https://joshwcomeau.com/rss.xml",
        ],
        items: [
          {
            title: "Test Item",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url: "joshuaj.co.uk",
            date: "Sat, 22 Feb 2020",
          },
          {
            title: "Test Item",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url: "joshuaj.co.uk",
            date: "Sat, 22 Feb 2020",
          },
          {
            title: "Test Item",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url: "joshuaj.co.uk",
            date: "Sat, 22 Feb 2020",
          },
        ],
      },
      {
        name: "Test Collection 2",
        feeds: [
          "https://joshuaj.co.uk/rss.xml",
          "https://joshwcomeau.com/rss.xml",
        ],
        items: [
          {
            title: "Test Item",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url: "joshuaj.co.uk",
            date: "Sat, 22 Feb 2020",
          },
        ],
      },
    ]);

    this.transitionToRoute("/");
  }
}
