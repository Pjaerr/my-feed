import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find, click } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | menu", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders the hamburger button", async function (assert) {
    await render(hbs`<Menu/>`);

    assert.dom('button[aria-label="toggle menu"]').exists().isVisible();
  });

  test("Clicking the hamburger button opens the menu", async function (assert) {
    await render(hbs`<Menu/>`);

    const hamburgerButton = find('button[aria-label="toggle menu"]');

    //Assert that the menu is hidden until button is clicked
    assert
      .dom('nav[aria-label="Application navigation"]')
      .exists()
      .isNotVisible();

    await click(hamburgerButton);

    //Assert that all relevant sections are there and have content inside of them
    assert.dom('nav[aria-label="Application navigation"]').exists().isVisible();
  });
});
