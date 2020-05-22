import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | collection-manager", function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(() => {
    localStorage.clear();
  });

  test("it exists", function (assert) {
    const collectionManager = this.owner.lookup("service:collection-manager");

    assert.ok(collectionManager);
  });

  test("Setting collections saves them to local storage", function (assert) {
    const collectionManager = this.owner.lookup("service:collection-manager");

    assert.equal(
      localStorage.getItem("collections"),
      null,
      "No collections exist yet"
    );

    const collections = [
      {
        name: "Frontend",
        feeds: ["https://joshuaj.co.uk/rss.xml"],
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
        ],
      },
    ];

    collectionManager.collections = collections;

    assert.equal(
      localStorage.getItem("collections"),
      JSON.stringify(collections),
      "Collections have been saved to local storage after setting collectionManager.collections"
    );
  });

  test("Getting collections returns parsed JSON", function (assert) {
    const collectionManager = this.owner.lookup("service:collection-manager");

    const collections = [
      {
        name: "Frontend",
        feeds: ["https://joshuaj.co.uk/rss.xml"],
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
        ],
      },
    ];

    collectionManager.collections = collections;

    assert.deepEqual(
      collectionManager.collections,
      collections,
      "collectionManager.collections returns a proper JavaScript object"
    );
  });

  //TEST TODO: refreshCollection()
  //TEST TODO: refreshAllCollections()
});
