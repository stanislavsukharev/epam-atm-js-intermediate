# Google Cloud Calculator – Playwright Test Automation Framework
This project contains automated UI tests for the Google Cloud Pricing Calculator, built using Playwright and TypeScript.
It follows the Page Object Model (POM) design pattern to ensure modularity and maintainability.

## Project Structure

```
├── src
│   ├── pageObjects
│   │   └── playwright
│   │       ├── BasePage.ts
│   │       └── CalculatorPage.ts
│   └── tests
│       └── playwright
│           └── cloudCalculator.spec.ts
├── test-results
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Setup and Installation

1. Clone the repository:

`git clone https://git.epam.com/stanislav_sukharev/atm-js-intermediate.git`

2. Navigate to project directory:

`cd atm-js-intermediate`

3. Install dependencies:

`npm install`

## Running Tests

# Run tests in Chromium only
`npm run test:playwright`

# Run tests in all browsers
`npm run test:playwright:all`

## Technologies Used

| Tool             | Purpose                          |
|------------------|----------------------------------|
| Playwright       | Modern browser automation        |
| TypeScript       | Type-safe codebase               |
| Playwright Test  | Built-in Playwright test runner  |
| POM Pattern      | Maintainable test structure      |

