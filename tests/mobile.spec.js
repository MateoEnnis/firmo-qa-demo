const { test, expect } = require("@playwright/test");

test.describe("Mobile — Responsive behavior", () => {

  test("Homepage loads correctly on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Hamburger menu is visible on mobile", async ({ page }) => {
    await page.goto("/");
    const hamburger = page.getByRole("button", { name: /Open menu/i });
    await expect(hamburger).toBeVisible();
  });

  test("Hamburger menu opens and shows links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Open menu/i }).click();
    await expect(page.getByRole("link", { name: "Work" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Get in touch/i })).toBeVisible();
  });

  test("No horizontal scroll on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - document.documentElement.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("No horizontal scroll on /work page", async ({ page }) => {
    await page.goto("/work");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("Contact form is usable on mobile", async ({ page }) => {
    await page.goto("/#contact");
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByRole("button", { name: /Send message/i })).toBeVisible();
  });
});
