// playwright.config.cjs
require("dotenv").config();
const { defineConfig, devices } = require("@playwright/test");

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const WEB_BASE_URL = process.env.WEB_BASE_URL || "http://localhost:5173";
const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL || "http://localhost:5174";
const MOBILE_BASE_URL = process.env.MOBILE_BASE_URL || "http://localhost:5175";
const RUN_UI_SPECS = process.env.RUN_UI_SPECS === "true";

/**
 * Project layout:
 *  - "api"            → pure HTTP/API tests (request fixture only, no browser).
 *                        Covers TC-REG / TC-CHECKOUT / TC-IMPORT / TC-OSM business logic.
 *  - "web-e2e"        → browser E2E against frontend-web (port WEB_BASE_URL).
 *  - "admin-e2e"      → browser E2E against frontend-admin (port ADMIN_BASE_URL).
 *  - "mobile-e2e"     → browser E2E against frontend-mobile (port MOBILE_BASE_URL),
 *                        emulated with a mobile viewport/device profile.
 *
 * UI projects are gated behind RUN_UI_SPECS=true in .env so that, for now
 * (TC-REG first pass), only the "api" project runs unless you opt in.
 * Each spec file decides for itself which project(s) it belongs to via
 * test.describe.configure / file naming — see tests/reg.spec.cjs.
 */
module.exports = defineConfig({
  testDir: "./tests",
  outputDir: "./test/test_runs/artifacts",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ["list"],
    ["html", { outputFolder: "./test/test_runs/html-report", open: "never" }],
    ["json", { outputFile: "./test/test_runs/results.json" }],
    ["./reporters/bug-reporter.cjs"],
  ],

  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "api",
      testMatch: /.*\.api\.spec\.cjs/,
      use: {
        baseURL: API_BASE_URL,
      },
    },
    {
      name: "web-e2e",
      testMatch: /.*\.web\.spec\.cjs/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: WEB_BASE_URL,
      },
      ...(RUN_UI_SPECS ? {} : { testMatch: /$^/ }), // disables project if UI specs not enabled
    },
    {
      name: "admin-e2e",
      testMatch: /.*\.admin\.spec\.cjs/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: ADMIN_BASE_URL,
      },
      ...(RUN_UI_SPECS ? {} : { testMatch: /$^/ }),
    },
    {
      name: "mobile-e2e",
      testMatch: /.*\.mobile\.spec\.cjs/,
      use: {
        ...devices["Pixel 7"],
        baseURL: MOBILE_BASE_URL,
      },
      ...(RUN_UI_SPECS ? {} : { testMatch: /$^/ }),
    },
  ],
});
