// E2E test to verify the landing (login) page is correctly shown
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


//This is a dummy test
test('User lands on login page and sees header', async ({ page }) => {
  await page.goto('/');
  const loginPage = await new LoginPage(page).init();
  expect(await loginPage.isOnLoginPage()).toBe(true);
});