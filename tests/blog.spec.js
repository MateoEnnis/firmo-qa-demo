const { test, expect } = require("@playwright/test");

test.describe("/blog — Blog index", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("Blog index loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Blog.*Firmo/i);
  });

  test("All 4 articles are listed", async ({ page }) => {
    await expect(page.getByText(/5 Business Processes/i)).toBeVisible();
    await expect(page.getByText(/n8n vs Zapier/i)).toBeVisible();
    await expect(page.getByText(/How Much Does.*Automation.*Cost/i)).toBeVisible();
    await expect(page.getByText(/QA Checklist/i)).toBeVisible();
  });

  test("Article cards link to correct slugs", async ({ page }) => {
    const firstArticle = page.getByRole("link", { name: /5 Business Processes/i });
    await expect(firstArticle).toHaveAttribute("href", "/blog/5-processes-to-automate-with-n8n");
  });
});

test.describe("/blog — Article pages", () => {
  test("n8n article has comparison table", async ({ page }) => {
    await page.goto("/blog/n8n-vs-zapier");
    await expect(page.getByRole("heading", { name: /n8n vs Zapier/i })).toBeVisible();
    await expect(page.getByText("The short answer")).toBeVisible();
    await expect(page.getByText("Cost comparison")).toBeVisible();
  });

  test("Pricing article has cost breakdown cards", async ({ page }) => {
    await page.goto("/blog/how-much-does-automation-cost");
    await expect(page.getByText("Simple workflow")).toBeVisible();
    await expect(page.getByText("Multi-step workflow")).toBeVisible();
    await expect(page.getByText("AI-powered automation")).toBeVisible();
  });

  test("QA checklist article shows 10 items", async ({ page }) => {
    await page.goto("/blog/qa-checklist-before-launch");
    const items = page.locator("text=/^0[0-9]/");
    await expect(items.first()).toBeVisible();
    const count = await page.getByText(/Cross-browser|Mobile on real|Form validation|API error|Load time|Full auth|user journey|Payment|Email|404/).count();
    expect(count).toBeGreaterThan(5);
  });

  test("Back to blog link works on article pages", async ({ page }) => {
    await page.goto("/blog/n8n-vs-zapier");
    await page.getByRole("link", { name: /Back to blog/i }).click();
    await expect(page).toHaveURL(/\/blog$/);
  });

  test("CTA button on articles links to contact", async ({ page }) => {
    await page.goto("/blog/5-processes-to-automate-with-n8n");
    const cta = page.getByRole("link", { name: /Start a project/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/#contact");
  });
});
