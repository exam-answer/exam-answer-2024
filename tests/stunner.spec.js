// @ts-check
const { test, expect } = require('@playwright/test');

test('switches languages', async ({ page }) => {
  await page.goto('https://stunnermedia.com/');

  await expect(page.getByRole('heading', { name: 'Né à Montréal, Canada.' })).toBeVisible();

  // On desktop the EN link is at the top, on mobile it uses the EN link at the bottom. 
  await page.getByRole('link', { name: 'EN'}).first().click();

  await expect(page.getByRole('heading', { name: 'Born and Raised in Montreal, Canada.' })).toBeVisible();
});

test('mobile navigation', async ({ page }) => {
  await page.goto('https://stunnermedia.com/');

  // The page switches to mobile mode <1075.
  // If this is not intended behaviour, replace 1075 with 1025.
  await page.setViewportSize({ width: 1075, height:  1000 });
  await expect(page.locator('nav').getByRole('link', { name: 'ACCUEIL' })).toBeVisible();

  await page.setViewportSize({ width: 1023, height:  1000 });
  await page.getByLabel('Toggle navigation').locator('visible=true').click();
  await expect(page.locator('nav').getByRole('link', { name: 'ACCUEIL' })).toBeVisible();
});

test('contact form', async ({ page }) => {
  await page.goto('https://stunnermedia.com/');

  await page.locator('nav').getByRole('link', { name: 'CONTACT' }).click();

  // Filling the inputs ensures the forms fields are fillable.
  await page.locator('input[name=name]').fill('John Smith');
  await page.locator('input[name=email]').fill('johnsmith@example.com');
  await page.locator('input[name=subject]').fill('Investment Opportunities in Nigeria');
  await page.locator('textarea[name=message]').fill('Come invest in very real businesses in Nigeria');
  await expect(page.locator('#matchCapt')).toBeEditable();

  await expect(page.getByRole('button', { name: 'Envoyer' })).toBeEnabled({ enabled: false });
});

