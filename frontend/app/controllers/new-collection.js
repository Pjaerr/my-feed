import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class BlogPostController extends Controller {
  @service collectionManager;

  //This is temporary. The start new collection will eventually just be a <LinkTo> the relevant route
  @action startNewCollection() {
    this.collectionManager.collections = [
      {
        name: "Frontend",
        feeds: [
          "https://joshuaj.co.uk/rss.xml",
          "https://joshwcomeau.com/rss.xml",
        ],
        items: [
          {
            title: "Building a Desktop App using Svelte and Electron",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url:
              "https://joshuaj.co.uk/blog/building-desktop-app-svelte-electron",
            date: "Sat, 22 Feb 2020",
          },
          {
            title: "Lessons Learned Speaking at Conferences",
            image:
              "https://joshwcomeau.com/images/og-lessons-learned-speaking-at-conferences.png",
            description:
              "This post was originally published on Medium in August 2018. I've rewritten it to include stuff I've learned since, and discuss how the COVID-19 pandemic affects it all.",
            url:
              "https://joshwcomeau.com/blog/lessons-learned-speaking-at-conferences",
            date: "Fri, 6 May 2020",
          },
          {
            title: "Lets Create: A Data Visualization using Svelte",
            image:
              "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            description:
              "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            url:
              "https://joshuaj.co.uk/blog/building-desktop-app-svelte-electron",
            date: "Sat, 22 Feb 2020",
          },
        ],
      },
      {
        name: "Design",
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
            url: "https://joshuaj.co.uk/",
            date: "Sat, 22 Feb 2020",
          },
        ],
      },
      {
        name: "Career",
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
            url: "https://joshuaj.co.uk/",
            date: "Sat, 22 Feb 2020",
          },
        ],
      },
    ];

    this.transitionToRoute("/");
  }
}
