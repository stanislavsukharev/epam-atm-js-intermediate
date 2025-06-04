import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'results/junit-results.xml' }],
    /* [
      '@reportportal/agent-js-playwright',
      {
        endpoint: 'https://reportportal.epam.com/api/v1',
        apiKey:
          'aqa-js-intermediate_c7ZiujRxTGSMysQE8fA6WnZPVtABmJPtcn4EGGv736qirZn67VwZU0rMw7L337FQ',
        project: 'stanislav_sukharev_personal',
        launch: 'Playwright Launch',
        description: 'Playwright automated test run',
        attributes: [{ key: 'env', value: 'qa' }],
        debug: false,
      },
    ], */
  ],

  use: {
    baseURL: 'https://cloud.google.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

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
  ],
})
