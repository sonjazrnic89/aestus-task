import fetch from 'node-fetch';
import { expect, Page } from '@playwright/test';
import { MailSlurp } from 'mailslurp-client';

// ✅ Move API key here centrally
const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY! });

// ✅ Generate inbox and return both inbox ID and email
export async function generateInbox() {
  const inbox = await mailslurp.createInbox();
  return { emailAddress: inbox.emailAddress, inboxId: inbox.id };
}

// ✅ Wait for email and click confirmation link
export async function waitForConfirmationLink(inboxId: string, page: Page): Promise<void> {
  const email = await mailslurp.waitForLatestEmail(inboxId, {
    timeout: 30000,
    unreadOnly: true
  } as any);

  expect(email.from).toBe('no-reply2dev@dev-test-stg.parra.hr');
  expect(email.subject).toContain('[Parra DEV] EmailConfirmation.Subject');
  expect(email.body).toContain('potvrdi svoju e-mail adresu');

  const linkRegex = /https?:\/\/[^\s"]+/g;
  const links = email.body?.match(linkRegex) || [];

  const trackingLink = links.find(link => link.includes('/click/'));
  if (!trackingLink) throw new Error('No tracking link found in the email.');

  const response = await fetch(trackingLink, { method: 'GET', redirect: 'follow' });
  const finalUrl = response.url;

  console.log('Confirming resolved final confirmation link:', finalUrl);

  if (!finalUrl.includes('/auth/email-confirm')) {
    throw new Error(`Final URL doesn't look like a confirmation link: ${finalUrl}`);
  }

  await page.goto(finalUrl);
  await page.waitForLoadState('domcontentloaded');
}