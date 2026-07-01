# Firmo QA Demo — Playwright E2E Test Suite

Automated E2E tests for [firmo-site.vercel.app](https://firmo-site.vercel.app).

**60 tests · 3 browsers (Chromium, Firefox, Mobile Chrome) · 100% pass rate**

**[→ View live test report](https://mateoennis.github.io/firmo-qa-demo/)**

## What's tested

| Suite | Tests | Coverage |
|-------|-------|----------|
| Homepage | 13 | Hero, nav, TrustStrip, services, testimonials, contact form |
| /work page | 6 | Projects, screenshots, video, CTA |
| /blog | 10 | Index, all 4 articles, back navigation |
| Mobile | 6 | Hamburger menu, no horizontal scroll, form usability |

## Tech stack

- **[Playwright](https://playwright.dev/)** — E2E testing framework
- **JavaScript** — no TypeScript overhead for demo simplicity
- **Browsers:** Chromium, Firefox, Mobile Chrome (Pixel 5)

## Run locally

```bash
npm install
npx playwright install chromium firefox
npx playwright test
npx playwright show-report report
```

## About Firmo

[Firmo](https://firmo-site.vercel.app) is a one-person tech studio offering automation (n8n + AI), QA testing, and web development.

This test suite demonstrates professional QA automation — the same type of setup I deliver for clients.
