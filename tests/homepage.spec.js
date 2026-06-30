const { test, expect } = require("@playwright/test");

test.describe("Homepage — Core content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Page loads and title is correct", async ({ page }) => {
    await expect(page).toHaveTitle(/Firmo/);
  });

  test("Hero headline is visible", async ({ page }) => {
    const headline = page.getByRole("heading", { level: 1 });
    await expect(headline).toBeVisible();
    await expect(headline).toContainText("autopilot");
  });

  test("CTA button is visible and clickable", async ({ page }) => {
    const cta = page.getByRole("link", { name: /Start a project/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#contact");
  });

  test("TrustStrip shows key stats", async ({ page }) => {
    await expect(page.getByText("Years in Operations & Tech")).toBeVisible();
    await expect(page.getByText("Automations Delivered")).toBeVisible();
  });

  test("Services section renders all 3 services", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Automation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "QA & Testing" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Web Development" })).toBeVisible();
  });

  test("Testimonials section has 5-star reviews", async ({ page }) => {
    await expect(page.getByText(/5.0 across the board/i)).toBeVisible();
  });
});

test.describe("Homepage — Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Logo links to homepage", async ({ page }) => {
    const logo = page.getByRole("link", { name: /FIRMO/i }).first();
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("Nav links are present", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Services" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Work" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" }).first()).toBeVisible();
  });

  test("Work nav link goes to /work", async ({ page }) => {
    const workLink = page.getByRole("link", { name: "Work" }).first();
    await expect(workLink).toHaveAttribute("href", "/work");
  });
});

test.describe("Homepage — Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("Contact form is visible with all fields", async ({ page }) => {
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Service")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByRole("button", { name: /Send message/i })).toBeVisible();
  });

  test("Form requires name field", async ({ page }) => {
    await page.getByRole("button", { name: /Send message/i }).click();
    const nameInput = page.getByLabel("Name");
    const validationMessage = await nameInput.evaluate(el => el.validationMessage);
    expect(validationMessage).not.toBe("");
  });

  test("Form requires valid email format", async ({ page }) => {
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("notanemail");
    await page.getByLabel("Message").fill("Test message");
    await page.getByRole("button", { name: /Send message/i }).click();
    const emailInput = page.getByLabel("Email");
    const validationMessage = await emailInput.evaluate(el => el.validationMessage);
    expect(validationMessage).not.toBe("");
  });

  test("Service dropdown has all 4 options", async ({ page }) => {
    const select = page.getByLabel("Service");
    await expect(select.getByRole("option", { name: /Automation/i })).toBeAttached();
    await expect(select.getByRole("option", { name: /QA/i })).toBeAttached();
    await expect(select.getByRole("option", { name: /Web Development/i })).toBeAttached();
    await expect(select.getByRole("option", { name: /Other/i })).toBeAttached();
  });
});
