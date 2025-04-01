# Google Cloud Calculator – Playwright Test Automation Framework
This project contains automated UI tests for the Google Cloud Pricing Calculator, built using Playwright and TypeScript.
It follows the Page Object Model (POM) design pattern to ensure modularity and maintainability.

## Project Structure

```
├── src
│   ├── pageObjects
│   │      ├── BasePage.ts
│   │      └── CalculatorPage.ts
│   └── tests
│          └── cloudCalculator.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```
## 📁 Project Structure & Naming Conventions

This project follows the **Page Object Model** (POM) and organizes files clearly:

| Folder/File               | Purpose                               |
|--------------------------|----------------------------------------|
| `src/pages/`             | Contains all Playwright page objects   |
| `src/tests/`             | Contains Playwright test specs         |
| `base.page.ts`           | Base class for page objects            |
| `calculator.page.ts`     | Page object for the Google calculator  |
| `calculator.spec.ts`     | End-to-end tests for calculator        |

Naming follows the pattern:  
🔹 `*.page.ts` — Page Object  
🔹 `*.spec.ts` — Test Spec  

## Setup and Installation

1. Clone the repository:

`git clone https://git.epam.com/stanislav_sukharev/atm-js-intermediate.git`

2. Navigate to project directory:

`cd atm-js-intermediate`

3. Install dependencies:

`npm install`

## Running Tests

Run tests in Chromium only:

`npm run test:playwright:chromium`

Run tests in all browsers:

`npm run test:playwright:all`

## Technologies Used

| Tool             | Purpose                          |
|------------------|----------------------------------|
| Playwright       | Modern browser automation        |
| TypeScript       | Type-safe codebase               |
| Playwright Test  | Built-in Playwright test runner  |
| POM Pattern      | Maintainable test structure      |

