# Google Cloud Calculator - WebdriverIO Test Automation Framework

This project contains automated UI tests for the Google Cloud Pricing Calculator, developed using **WebdriverIO**, **TypeScript**, and the **Mocha** framework. The framework follows the **Page Object Model (POM)** pattern, which allows clear separation of test logic and page interactions.

## Project Structure

```

├── src
│   ├── pageObjects
│   │   ├── BasePage.ts
│   │   └── CalculatorPage.ts
│   └── tests
│       └── smoke
│           └── cloudCalculator.tests.ts
├── wdio.conf.mjs
├── package.json
├── tsconfig.json
└── README.md
```

The project structure includes:

- **BasePage.ts**  
  Base page class containing common methods for page interactions, such as navigating to URLs.

- **CalculatorPage.ts**  
  Page object for the Google Cloud Calculator page. Contains selectors and methods for interactions such as:
  - Accepting cookies
  - Adding estimates
  - Selecting Compute Engine
  - Incrementing instances
  - Retrieving total cost

- **cloudCalculator.tests.ts**  
  Test cases covering core functionality:
  - Adding a new estimate and verifying visibility
  - Incrementing instance count and verifying the total cost calculation

## Setup and Installation

1. Clone the repository:

`git clone https://git.epam.com/stanislav_sukharev/atm-js-intermediate.git`

2. Navigate to project directory:

`cd atm-js-intermediate`

3. Install dependencies:

`npm install`

## Running Tests

`npm run test`

Tests will run in Chrome browser by default

## Generating Reports

- To generate a detailed Allure report:

`npm run report:generate`

Reports will be generated in the allure-results directory

## Technologies & Libraries Used

- WebdriverIO v9+
- TypeScript
- Mocha (test runner)
- Allure (reporting tool)

