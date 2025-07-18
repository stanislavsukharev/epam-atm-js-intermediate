# Google Cloud Calculator – Playwright Test Automation Framework
This project contains automated UI tests for the Google Cloud Pricing Calculator, built using Playwright and TypeScript.
It follows the Page Object Model (POM) design pattern to ensure modularity and maintainability.

## Project Structure

```src  
    ├── components
    │     ├── footer.component.ts
    │     └── header.component.ts
    │ 
    ├── fixtures  
    │     └── fixtures.ts  
    │
    ├── pages  
    │     ├── base.page.ts  
    │     ├── cloud-sql.page.ts  
    │     ├── cloud-storage.page.ts  
    │     ├── compute-engine.page.ts
    │     └── layout-localization.page.ts
    │  
    ├── test-data  
    │     ├── calculator.data.ts 
    │     └── language-expectations.ts
    │
    ├── tests  
    │     ├── cloud-sql.spec.ts  
    │     ├── cloud-storage.spec.ts  
    │     ├── compute-engine.spec.ts  
    |     ├── export-estimate-as-csv.spec.ts 
    |     ├── visual.spec.ts
    |     └── layout-localization.spec.ts 
```
## Project Structure & Naming Conventions

This project follows the **Page Object Model** (POM) and organizes files clearly:

| Folder/File                     | Purpose                                      |
|--------------------------------|----------------------------------------------|
| `src/pages/`                   | Contains all Playwright page objects         |
| `src/tests/`                   | Contains Playwright test specs               |
| `src/test-data/`               | Contains Playwright test data                |
| `src/fixtures/`                | Custom Playwright fixtures                   |
| `src/utils/`                   | Utility modules (e.g. CSV parsing)           |
| `src/components/`              | UI components                                 |
| `base.page.ts`                 | Base class for shared page object logic      |
| `cloud-sql.page.ts`            | Page object for Cloud SQL calculator section |
| `cloud-storage.page.ts`        | Page object for Cloud Storage section        |
| `compute-engine.page.ts`       | Page object for Compute Engine section       |
| `layout-localization.page.ts`  | Page object for Header/Footer localization   |
| `cloud-sql.spec.ts`            | End-to-end tests for Cloud SQL calculator    |
| `cloud-storage.spec.ts`        | End-to-end tests for Cloud Storage           |
| `compute-engine.spec.ts`       | End-to-end tests for Compute Engine          |
| `export-estimate-as-csv.spec.ts`| Verifies download and validation of estimates as CSV |
| `visual.spec.ts`               | Visual regression tests                    |
| `layout-localization.spec.ts`  | Parameterized tests for Header/Footer localization|
| `csv-utils.ts`                 | Validates downloaded CSV files               |
| `calculator.data.ts`           | Test data used in calculator scenarios       |
| `fixtures.ts`                  | Defines reusable fixtures for tests          |

Naming follows the pattern:  
`*.page.ts` — Page Object  
`*.spec.ts` — Test Spec  
`*.data.ts` — Test Data
`*.component.ts` - UI component  

## Setup and Installation

1. Clone the repository:
`git clone https://github.com/stanislavsukharev/epam-atm-js-intermediate`

2. Navigate to project directory:
`cd atm-js-intermediate`

3. Install dependencies:
`npm install`

## Running Tests

- Run tests in Chromium only:
`npm run test:playwright:chromium`

- Run tests in all browsers:
`npm run test:playwright:all`

## Running mobile E2E tests

The Playwright configuration already contains two mobile projects based on
device emulation:

| Project name (in `playwright.config.ts`) | Emulator |
| ---------------------------------------- | -------- |
| `iPhone 15 Pro`                          | iOS 17 – iPhone 15 Pro (430 × 932) |
| `iPad Pro 11`                            | iPad Pro 11-inch (830 × 1194) |

 - e2e mobile tests location:

tests/cloud-sql.spec.ts
tests/cloud-storage.spec.ts
tests/compute-engine.spec.ts

- Run mobile tests
`npm run test:e2e:mobile`

## Visual Testing

- Run all visual regression tests:
`npx playwright test tests/visual.spec.ts`

- To update snapshots:
`npx playwright test tests/visual.spec.ts --update-snapshots`

## Localization Testing: Header & Footer

- Supported languages (by default):  
  - `en` – English  
  - `es` – Español  

  - to run:
 `npx playwright test src/tests/layout-localization.spec.ts` 
  

- Optional languages:  
  - `ja` – 日本語

  - to run: 
`TEST_LANGUAGES=ja npx playwright test src/tests/layout-localization.spec.ts`

## Reporting

This project is configured to generate the following reports:

1. **HTML Report**: After test execution, an HTML report with test details, screenshots, videos, and traces for failed tests is generated in the `playwright-report` directory. The report does not open automatically.

2. **JUnit Report**: A JUnit-compatible XML report is saved in the `results/` directory as `junit-results.xml`.

3. **Report Portal**: Test results are sent to [Report Portal](https://reportportal.epam.com) under the personal project "stanislav_sukharev_personal". Make sure the `apiKey` and `project` are correctly configured in `playwright.config.ts`.

## ESLint Configuration

The project uses **ESLint** for linting with the following configuration:

1. **Plugins**:
   - `eslint-plugin-playwright` for Playwright-specific rules.
   - `eslint-plugin-prettier` for integrating Prettier with ESLint.

2. **Scripts**:
- To run ESLint: 
`npm run lint`
     
- To automatically fix issues:
`npm run lint:fix`


3. **Configuration**:
   - Rules for Prettier are set to **warn**.
   - Playwright-specific linting rules such as `no-focused-test` and `no-skipped-test` are enforced.
   - The following files and directories are ignored from linting and Git:
     - `node_modules/`, `playwright-report/`, `results/`, `.env`, `.idea/`, `.vscode/`

## Git Ignore

The following files and folders are excluded from version control:

- `node_modules/`
- `playwright-report/`
- `results/`
- `.env`
- `.idea/`
- `.vscode/`

## Technologies Used

| Tool             | Purpose                          |
|------------------|----------------------------------|
| Playwright       | Modern browser automation        |
| TypeScript       | Type-safe codebase               |
| Playwright Test  | Built-in Playwright test runner  |
| POM Pattern      | Maintainable test structure      |
| ESLint           | Code linting and style enforcement |
| Prettier         | Code formatting                  |
| csv-parse	       | CSV parsing and transformation   |

## Notes
The CSV download logic is tested via export-estimate-as-csv.spec.ts, and validated using custom logic from csv-utils.ts.
Make sure the expected cost value is aligned with the test data when asserting CSV content.