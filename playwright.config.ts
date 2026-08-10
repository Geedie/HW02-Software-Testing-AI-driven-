import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration — EShop SUT Automation Testing
 * MSSV: 23127147
 * HW04 — Automation Testing
 */

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /**
   * Reporter: HTML reporter
   * Title hiển thị "Run by: 23127147" trong report
   * Ref: https://playwright.dev/docs/test-reporters#html-reporter
   */
  reporter: [
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
        title: 'Run by: 23127147 | EShop SUT — HW04 Automation Testing',
      },
    ],
    ['list'],
  ],

  /* Shared settings for all the projects below. */
  use: {
    /* Base URL for web frontend */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Headless mode for CI, headed for local demo */
    headless: false,

    launchOptions: {
      slowMo: 300,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Admin tests use different baseURL (port 5174) */
    {
      name: 'chromium-admin',
      testMatch: '**/category-admin.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5174',
      },
    },
    {
      name: 'firefox-admin',
      testMatch: '**/category-admin.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'http://localhost:5174',
      },
    },
    {
      name: 'webkit-admin',
      testMatch: '**/category-admin.spec.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'http://localhost:5174',
      },
    },
  ],
});