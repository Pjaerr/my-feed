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
    const menu = find('nav[aria-label="Application navigation"]').parentElement;
    assert.dom(menu).exists();

    /**Struggling to test if an element is on screen using boundingRect as I think Ember tests
     * running inside of a test container is doing something funky. For now I'm just gonna test that
     * the isopen class exists, but would prefer a more concrete test if I ever had the time.
     */

    assert.dom(menu).doesNotHaveClass("menu--open");

    await click(hamburgerButton);

    assert.dom(menu).hasClass("menu--open");
  });

  //TODO: Add a test here (once figured out how to set test viewport) to ensure that you can't scroll the body element when on mobile and menu is open.
});
