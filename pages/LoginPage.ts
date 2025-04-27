import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  header!: Locator;
  registerLink!: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async init(): Promise<LoginPage> {
    this.header = this.page.getByRole('heading', { name: 'Prijavi se u Parru' });
    this.registerLink = this.page.getByRole('link', { name: 'Registriraj se' });

    // Wait for both elements to be visible
    await Promise.all([
      this.header.waitFor({ state: 'visible' }),
      this.registerLink.waitFor({ state: 'visible' })
    ]);

    return this;
  }

  async isOnLoginPage(): Promise<boolean> {
    const visible = await this.header.isVisible().catch(() => false);
    if (!visible) {
      console.log(await this.page.content());
    }
    return visible;
  }

  async goToRegistration(): Promise<void> {
    await this.registerLink.click();
  }
}