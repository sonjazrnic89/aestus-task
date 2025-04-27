import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';
import { RegisterPage } from '../pages/RegisterPage.ts';
import { generateInbox, waitForConfirmationLink } from '../utils/EmailUtils';


test('e2e registration flow', async ({ page }) => {

    const { emailAddress, inboxId } = await generateInbox();
    await page.goto('/');
  
    const loginPage = await new LoginPage(page).init();
    expect(await loginPage.isOnLoginPage()).toBe(true);
  
    // Go to registration
    await loginPage.goToRegistration();

    const registerPage = await new RegisterPage(page).init();
    expect(await registerPage.isOnRegisterPage()).toBe(true);
    await registerPage.enterFullName('Tester Testercic');
    await registerPage.enterEmail(emailAddress);
    await registerPage.enterPassword('StrongPassword123!');
    await registerPage.enterConfirmPassword('StrongPassword123!');
    await registerPage.clickRegisterButton();
    await registerPage.expectSuccessfulRegistrationToast();
    await waitForConfirmationLink(inboxId, page);
  });