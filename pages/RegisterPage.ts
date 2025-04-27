import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly header: Locator;
  readonly nameInput: Locator;
  readonly nameInputContainer: Locator;
  readonly errorMessageFirstName: Locator;
  readonly emailInput: Locator;
  readonly emailInputContainer: Locator;
  readonly errorMessageEmail: Locator;
  readonly passwordInput: Locator;
  readonly passwordInputContainer: Locator;
  readonly errorMessagePassword: Locator;
  readonly errorMessagePasswordMismatch: Locator;
  readonly confirmPasswordInput: Locator;
  readonly confirmPasswordInputContainer: Locator;
  readonly registerButton: Locator;
  readonly toastTitle: Locator;
  readonly toastDescription: Locator;


  constructor(page: Page) {
    this.page = page;

    // Locator for the registration page header
    this.header = page.getByRole('heading', { name: 'Registriraj se u Parru' });
    this.nameInput = page.getByRole('textbox', { name: 'firstAndLastName' });
    this.nameInputContainer = page.locator('[formcontrolname="firstAndLastName"] .dx-texteditor-container');
    this.errorMessageFirstName = page.getByText('Obavezno polje', { exact: true });

    this.emailInput = page.getByRole('textbox', { name: 'email' });
    this.emailInputContainer = page.locator('[formcontrolname="email"] .dx-texteditor-container');
    this.errorMessageEmail = page.getByText('Obavezno polje', { exact: true });

    this.passwordInput = page.getByLabel('password', { exact: true });
    this.passwordInputContainer = page.locator('[formcontrolname="password"] .dx-texteditor-container');
    this.errorMessagePassword = page.getByText('Obavezno polje', { exact: true });
    this.errorMessagePasswordMismatch = page.getByText('Lozinke se ne podudaraju', { exact: true });

    this.confirmPasswordInput = page.getByLabel('confirmPassword', { exact: true }); 
    this.confirmPasswordInputContainer = page.locator('[formcontrolname="confirmPassword"] .dx-texteditor-container');
 
    this.registerButton = page.getByRole('button', { name: 'Registriraj se' });
    this.toastTitle = page.getByRole('heading', { name: 'Uspješna registracija', exact: true });
    this.toastDescription = page.getByText('Uspješno ste se registrirali u aplikaciju.', { exact: true });
  }

  // Initialization method that waits until the header is visible before continuing
  async init(): Promise<RegisterPage> {
    try {
      await this.header.waitFor({ state: 'visible', timeout: 5000 });
    } catch (error) {
      console.error('Failed to find Register page header:', error);
      console.log(await this.page.content());
      throw error; // re-throw so test fails clearly
    }
    return this;
  }

  // Confirms we are on the registration page
  async isOnRegisterPage(): Promise<boolean> {
    const visible = await this.header.isVisible().catch(() => false);
    if (!visible) {
      console.log(await this.page.content());
    }
    return visible;
  }


async enterFullName(fullName: string): Promise<void> {
    await this.nameInput.fill(fullName);
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async enterConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  async clickRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }

  async expectSuccessfulRegistrationToast(): Promise<void> {
    await this.toastTitle.waitFor({ state: 'visible', timeout: 5000 });
    await this.toastDescription.waitFor({ state: 'visible', timeout: 5000 });
  }

  async expectFirstNameFieldError(): Promise<void> {
    await expect(this.nameInputContainer).toHaveCSS('border-color', 'rgb(171, 25, 25)');
    await expect(this.errorMessageFirstName).toBeVisible();
  }

  async expectEmailFieldError(): Promise<void> {
    await expect(this.emailInputContainer).toHaveCSS('border-color', 'rgb(171, 25, 25)');
    await expect(this.errorMessageEmail).toBeVisible();
  }

  async expectPasswordFieldError(): Promise<void> {
    await expect(this.passwordInputContainer).toHaveCSS('border-color', 'rgb(171, 25, 25)');
    await expect(this.errorMessagePassword).toBeVisible();
    await expect(this.errorMessagePasswordMismatch).toBeVisible();

  }
  async expectMismatchPasswordError(): Promise<void> {
    await expect(this.errorMessagePasswordMismatch).toBeVisible();
  }

  async expectBorderColorInRed(): Promise<void> {
    await expect(this.nameInputContainer).toHaveCSS('border-color', 'rgb(171, 25, 25)');
    await expect(this.emailInputContainer).toHaveCSS('border-color', 'rgb(171, 25, 25)');
    await expect(this.passwordInputContainer).toHaveCSS('border-color', 'rgb(171, 25, 25)');
    await expect(this.confirmPasswordInputContainer).toHaveCSS('border-color', 'rgb(171, 25, 25)');
  }
}