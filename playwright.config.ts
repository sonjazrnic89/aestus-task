import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    baseURL: 'https://lemon-cliff-03b907503.6.azurestaticapps.net/',
    headless: false,
    screenshot: 'only-on-failure',
  },
  testDir: './tests',
  reporter: [['html']]
});
