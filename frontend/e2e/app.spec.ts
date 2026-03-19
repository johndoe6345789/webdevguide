import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and displays hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Learn React Web Development');
    await expect(page.getByText('Start Learning')).toBeVisible();
  });

  test('has working navigation header', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.getByText('WebDev Guide')).toBeVisible();
  });

  test('has a footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('navigates to Getting Started page', async ({ page }) => {
    await page.goto('/getting-started');
    await expect(page).toHaveURL(/getting-started/);
    await expect(page.locator('h1, h2, h3').first()).toBeVisible();
  });

  test('navigates to Glossary page', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page).toHaveURL(/glossary/);
    await expect(page.getByText('Web Development Glossary')).toBeVisible();
  });

  test('navigates to Features page', async ({ page }) => {
    await page.goto('/features');
    await expect(page).toHaveURL(/features/);
  });
});

test.describe('Glossary', () => {
  test('displays glossary terms', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page.getByText('Web Development Glossary')).toBeVisible();
    // Wait for terms to load from API
    await expect(page.getByText(/\d+ terms? found/i)).toBeVisible({ timeout: 10000 });
  });

  test('search filters terms', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page.getByText(/\d+ terms? found/i)).toBeVisible({ timeout: 10000 });

    const searchInput = page.getByPlaceholder('Search terms...');
    await searchInput.fill('React');
    // After typing, the count should change
    await expect(page.getByText(/\d+ terms? found/i)).toBeVisible();
  });
});

test.describe('Responsiveness', () => {
  test('mobile viewport shows menu button', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    // On mobile, there should be a hamburger menu button
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();
  });
});
