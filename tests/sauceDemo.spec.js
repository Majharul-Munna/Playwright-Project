import { test, expect } from '@playwright/test';

test('User logs in, adds product to cart, verifies product, and logs out', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Assert login
  await expect(page.locator('.title')).toHaveText('Products');

  // Product to add
  const productName = 'Sauce Labs Backpack';

  // Click Add to Cart button from product list
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

  // Open cart
  await page.click('.shopping_cart_link');

  // Verify product name in cart
  const cartItem = page.locator('.inventory_item_name');
  await expect(cartItem).toHaveText(productName);

  // Open menu and logout
  await page.click('#react-burger-menu-btn');

  // Wait for menu to open
  await page.waitForSelector('#logout_sidebar_link');

  await page.click('#logout_sidebar_link');

  // Verify logout
  await expect(page.locator('#login-button')).toBeVisible();
});
