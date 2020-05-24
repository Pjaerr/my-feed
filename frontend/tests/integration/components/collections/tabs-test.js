import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find, click } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | collections/tabs", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      tabs: ["All", "Frontend", "Design", "Career"],
      activeTab: 0,
      onRefresh: function () {},
      onChange: function (tabIndex) {},
    });
  });

  test("it renders", async function (assert) {
    await render(
      hbs`<Collections::Tabs @tabs={{this.tabs}} @activeTab={{this.activeTab}} @onRefresh={{this.onRefresh}} @onChange={{this.onChange}}/>`
    );

    const collectionTabsElement = find(
      'nav[aria-label="Collection navigation"]'
    );

    //Do the collection tabs exist
    assert.dom(collectionTabsElement).exists();

    //Do the collection tabs have a refresh button
    assert
      .dom(collectionTabsElement.querySelector('button[aria-label="Refresh"]'))
      .exists();

    const tabs = [
      ...collectionTabsElement.querySelectorAll("ul > li > button"),
    ];

    tabs.forEach((tab) => {
      //Remove whitespace and new lines
      const tabTextContent = tab.textContent.replace(/\n/g, "").trim();

      assert.ok(
        this.tabs.includes(tabTextContent),
        `"${tabTextContent}" matches one of the following: ${this.tabs.join(
          ", "
        )}`
      );
    });
  });

  test("Setting @activeTab changes the currently active tab", async function (assert) {
    await render(
      hbs`<Collections::Tabs @tabs={{this.tabs}} @activeTab={{this.activeTab}} @onRefresh={{this.onRefresh}} @onChange={{this.onChange}}/>`
    );

    //Setup CSS Variable to decouple test from real CSS variables
    document.body.style.setProperty("--colour-highlight", "rgb(10, 126, 34)");

    const collectionTabsElement = find(
      'nav[aria-label="Collection navigation"]'
    );

    const tabs = collectionTabsElement.querySelectorAll("ul > li > button");

    //Get the first tab and make sure it is highlighted as active
    assert.dom(tabs[0]).hasStyle(
      {
        borderBottom: "3px solid rgb(10, 126, 34)",
      },
      "First tab is highlighted"
    );

    this.set("activeTab", 2);

    assert.dom(tabs[0]).doesNotHaveStyle({
      borderBottom: "3px solid rgb(10, 126, 34)",
    });

    assert.dom(tabs[2]).hasStyle(
      {
        borderBottom: "3px solid rgb(10, 126, 34)",
      },
      "Third tab is highlighted after being set as the activeTab"
    );
  });

  test("The @onRefresh action is called when clicking the refresh button", async function (assert) {
    let count = 0;

    this.set("onRefresh", function () {
      count += 5;
    });

    await render(
      hbs`<Collections::Tabs @tabs={{this.tabs}} @activeTab={{this.activeTab}} @onRefresh={{this.onRefresh}} @onChange={{this.onChange}}/>`
    );

    const collectionTabsElement = find(
      'nav[aria-label="Collection navigation"]'
    );

    const refreshButton = collectionTabsElement.querySelector(
      'button[aria-label="Refresh"]'
    );

    assert.strictEqual(
      count,
      0,
      "Count is 0 before the refresh button has been clicked"
    );

    await click(refreshButton);

    assert.strictEqual(
      count,
      5,
      "Count is 5 after the refresh button has been clicked"
    );
  });

  //TODO TEST: Calling on Change
  test("The @onChange action is called when changing tabs and passes the tab index as a parameter", async function (assert) {
    let lastKnownTabIndex = 0;

    this.set("onChange", function (tabIndex) {
      lastKnownTabIndex = tabIndex;
    });

    await render(
      hbs`<Collections::Tabs @tabs={{this.tabs}} @activeTab={{this.activeTab}} @onRefresh={{this.onRefresh}} @onChange={{this.onChange}}/>`
    );

    const collectionTabsElement = find(
      'nav[aria-label="Collection navigation"]'
    );

    const tabs = collectionTabsElement.querySelectorAll("ul > li > button");

    assert.strictEqual(
      lastKnownTabIndex,
      0,
      "lastKnownTabIndex is 0 before a tab has been clicked"
    );

    await click(tabs[2]);

    assert.strictEqual(
      lastKnownTabIndex,
      2,
      "lastKnownTabIndex is 2 after the third tab has been clicked"
    );

    await click(tabs[1]);

    assert.strictEqual(
      lastKnownTabIndex,
      1,
      "lastKnownTabIndex is 1 after the second tab has been clicked"
    );
  });
});
