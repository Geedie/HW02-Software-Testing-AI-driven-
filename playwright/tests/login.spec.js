const { test, expect } = require('@playwright/test');

test('Login Success', async ({ page }) => {

    await page.goto('/');

    await page.fill('#email', 'admin@test.com');

    await page.fill('#password', '123456');

    await page.click('button[type=submit]');

    await expect(page).toHaveURL(/dashboard/);

});