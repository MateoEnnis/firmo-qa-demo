const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  reporter: [["html", { outputFolder: "report", open: "never" }], ["list"]],
  use: {
    baseURL: "https://firmo-site.vercel.app",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: ["**/mobile.spec.js"],
    },
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
      testIgnore: ["**/mobile.spec.js"],
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
      testMatch: ["**/mobile.spec.js"],
    },
  ],
});
