import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';
import { RegisterPage } from '../pages/RegisterPage.ts';

test.describe('E2E Negative Tests for Registration Page', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = await new LoginPage(page).init();
        expect(await loginPage.isOnLoginPage()).toBe(true);
    
        await loginPage.goToRegistration();
        registerPage = await new RegisterPage(page).init();
        expect(await registerPage.isOnRegisterPage()).toBe(true);
      });
      
    test('empty first name/last name field', async ({ page }) => {
    await registerPage.enterEmail('sonjatest@test.hr');
    await registerPage.enterPassword('StrongPassword123!');
    await registerPage.enterConfirmPassword('StrongPassword123!');
    await registerPage.clickRegisterButton();
    await registerPage.expectFirstNameFieldError();
      });

    test('empty email field', async ({ page }) => {
    await registerPage.enterFullName('Tester Testercic');
    await registerPage.enterPassword('StrongPassword123!');
    await registerPage.enterConfirmPassword('StrongPassword123!');
    await registerPage.clickRegisterButton();
    await registerPage.expectEmailFieldError();
  });

    test('empty password field', async ({ page }) => {
    await registerPage.enterFullName('Tester Testercic');
    await registerPage.enterEmail('sonjatest@test.hr');
    await registerPage.enterConfirmPassword('StrongPassword123!');
    await registerPage.clickRegisterButton();
    await registerPage.expectPasswordFieldError();
  });

  test('password mismatch', async ({ page }) => {
    await registerPage.enterFullName('Tester Testercic');
    await registerPage.enterEmail('sonjatest@test.hr');
    await registerPage.enterPassword('StrongPassword123!');
    await registerPage.enterConfirmPassword('StrongPassword123!!');
    await registerPage.clickRegisterButton();
    await registerPage.expectMismatchPasswordError();
  });

  test('empty fields', async ({ page }) => {
    await registerPage.clickRegisterButton();
    await registerPage.expectBorderColorInRed();
  });
});