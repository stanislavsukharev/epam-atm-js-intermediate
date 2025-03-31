# Google Cloud Pricing Calculator – Dual Test Automation Framework (Playwright + WebdriverIO)

This project provides automated UI tests for the Google Cloud Pricing Calculator, implemented using both Playwright and WebdriverIO to support a smooth migration strategy and side-by-side validation.

## Project Structure

```
├── src
│   ├── pageObjects
│   │   ├── playwright
│   │   │   ├── BasePage.ts
│   │   │   └── CalculatorPage.ts
│   │   └── wdio
│   │       ├── BasePage.ts
│   │       └── CalculatorPage.ts
│   └── tests
│       ├── playwright
│       │   └── cloudCalculator.spec.ts
│       └── wdio
│           └── cloudCalculator.tests.ts
├── playwright.config.ts
├── wdio.conf.mjs
├── package.json
├── tsconfig.json
├── README.md
```

## Technologies Used
| **Tool**          | **Purpose**                     |
|-------------------|----------------------------------|
| Playwright        | Modern browser automation        |
| WebdriverIO       | Legacy UI automation             |
| TypeScript        | Type-safe codebase               |
| Mocha             | WDIO test runner                 |
| Playwright Test   | Built-in Playwright runner       |
| Allure            | Reporting (WDIO only)            |

## Setup and Installation

1. Clone the repository:

`git clone https://git.epam.com/stanislav_sukharev/atm-js-intermediate.git`

2. Navigate to project directory:

`cd atm-js-intermediate`

3. Install dependencies:

`npm install`

## Running Tests
Playwright (Chromium only)
`npm run test:playwright`
Runs tests from src/tests/playwright using Playwright Test Runner

WebdriverIO (Mocha)
`npm run test:wdio`
Runs legacy tests from src/tests/wdio using Mocha + WDIO

## Migration Checklist

| **Step**                                             | **Status**         |
|------------------------------------------------------|--------------------|
| Playwright installation & setup                      |    Done            |
| Initial working config                               |    Done            |
| Page Objects refactored                              |    Done            |
| Tests rewritten using Playwright best practices      |    Done            |
| Parallel testing (Playwright + WDIO)                 |    Done            |
| Clear console output using spec/dot reporters        |    Done            |
| API mocking or tracing (optional)                    |    Not needed yet  |
| Docs updated (README.md)                             |    Done            |

## WDIO Reporting
To generate Allure reports:
`npm run report:generate`
Results stored in /allure-results

## Notes
No deprecated files are kept in the repo
Playwright is used only with its built-in runner, no Mocha
Each framework has its own set of page objects and tests
