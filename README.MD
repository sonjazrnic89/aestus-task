# Aestus Auto-Tests Project

Dear Traveler,

This repository contains Playwright + TypeScript **end-to-end automation tests** for the **Aestus** company's demo login and registration pages

---

## Project Structure

```
aestus-autotests/
|-- pages/               # Page Object Model (POM) classes (LoginPage.ts, RegisterPage.ts)
|-- tests/               # Test specifications (login.spec.ts, e2e-registration.spec.ts, etc.)
|-- utils/               # Utility functions (EmailUtils.ts)
|-- playwright.config.ts # Playwright configuration (baseURL, reporters, etc.)
|-- package.json         # Node.js project descriptor (dependencies, scripts)
|-- tsconfig.json        # TypeScript configuration
|-- .gitignore           # Ignore node_modules, reports, test results, etc.
```

---

## Key Concepts Implemented

- **Playwright** with **TypeScript**.
- **Page Object Model (POM)**:
  - `LoginPage.ts`: methods and locators for login page actions
  - `RegisterPage.ts`: methods and locators for registration page actions
- **MailSlurp Email API**:
  - `EmailUtils.ts`: helper utilities to generate random inboxes and verify registration emails
- **Positive and Negative E2E Tests**:
  - Tests registration success with email confirmation
  - Tests negative scenarios (missing fields, validation errors, etc.)

---

## How to Set Up Locally

1. **Clone the repository**:

```bash
git clone https://github.com/YOUR_USERNAME/aestus-autotests.git
cd aestus-autotests
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create a `.env` file** (optional but recommended) and add your MailSlurp API Key (or simply add via terminal export MAILSLURP_API_KEY=....... since we only have one variable):

```env
MAILSLURP_API_KEY=your-mailslurp-api-key-here
```

> **Important**: If you don't set the `.env` file, make sure to hardcode your API key in `EmailUtils.ts`.

4. **Run all tests**:

```bash
npx playwright test
```

5. **Run a specific test file**:

```bash
npx playwright test tests/e2e-registration.spec.ts
```

6. **View HTML report**:

```bash
npx playwright show-report
```

---

## Playwright Config (`playwright.config.ts`)
- **Browser**: Chromium
- **Base URL**: `https://lemon-cliff-03b907503.6.azurestaticapps.net/`
- **Headless**: False (browser UI will open)
- **Screenshots**: Captured on failure
- **Reporter**: HTML

---

## Notes

- Use the command `npm install` after cloning to restore dependencies
- MailSlurp inbox is auto-generated dynamically inside the tests
- Final confirmation email link is auto-extracted and visited to complete email verification
- **If this was real world project I would not expose baseURL and test-data such as username/password in plain-text but would put this in .env file, since this is a short DEMO project I left it like this!**

---

Happy testing! ✨