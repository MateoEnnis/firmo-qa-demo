const { test, expect } = require("@playwright/test");

test.describe("/work — Portfolio page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/work");
  });

  test("Page title includes Firmo", async ({ page }) => {
    await expect(page).toHaveTitle(/Work.*Firmo/i);
  });

  test("All 3 automation projects are visible", async ({ page }) => {
    await expect(page.getByText("AI-powered restaurant assistant")).toBeVisible();
    await expect(page.getByText("Real-time lead capture")).toBeVisible();
    await expect(page.getByText("CRM sync with zero duplicates")).toBeVisible();
  });

  test("QA and web dev case studies are visible", async ({ page }) => {
    await expect(page.getByText(/11 broken flows/i)).toBeVisible();
    await expect(page.getByText(/Dashboard load time/i)).toBeVisible();
  });

  test("AI chatbot video demo is present", async ({ page }) => {
    const video = page.locator("video");
    await expect(video).toBeVisible();
    const src = await video.getAttribute("src");
    expect(src).toContain("ai-chatbot-demo");
  });

  test("Project screenshots load correctly", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(3);
    for (let i = 0; i < Math.min(count, 3); i++) {
      const img = images.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect(img).toBeVisible();
    }
  });

  test("CTA links to contact form", async ({ page }) => {
    const cta = page.getByRole("link", { name: /Start a project/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/#contact");
  });
});
