import dayjs from "dayjs";

export const config = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "tsconfig.json",
    },
  },

  runner: "local",

  specs: ["./src/tests/**/*.tests.ts"],

  suites: {
    smoke: ["./src/tests/smoke/**/*.tests.ts"],
  },

  maxInstances: 1,

  capabilities: [
    {
      browserName: "chrome",
    },
  ],

  logLevel: "warn",

  bail: 0,
  baseUrl: "https://cloud.google.com",

  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  services: [],

  framework: "mocha",

  mochaOpts: {
    timeout: 30000,
  },

  onPrepare() {
    console.warn(`Start time: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`);
  },

  async before() {
    await browser.setWindowSize(1280, 720);
  },

  async afterTest(_test, _context, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },

  onComplete() {
    console.warn(`Finish time: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`);
  },
};
