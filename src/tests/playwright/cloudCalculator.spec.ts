import { test, expect } from '@playwright/test';
import { CalculatorPage } from '../../pageObjects/playwright/CalculatorPage';

test.describe('Cloud Calculator', () => {
  let calculatorPage: CalculatorPage;

  test.beforeEach(async ({ page }) => {
    calculatorPage = new CalculatorPage(page);
    await calculatorPage.open();
    await calculatorPage.acceptCookies();
  });

  test('should add a new estimate to calculator', async ({ page }) => {
    expect(page.url()).toContain('/products/calculator');

    await calculatorPage.addEstimate();
    await expect(calculatorPage.addEstimationModalWindow).toBeVisible();

    await calculatorPage.openComputeEngine();
    await expect(calculatorPage.configurationBlock).toBeVisible();
  });

  test('should add two new instances and check the total cost', async () => {
    const expectedCost = '$419.10';

    await calculatorPage.addEstimate();
    await calculatorPage.openComputeEngine();
    await calculatorPage.incrementInstances(2);
    await expect(calculatorPage.totalCost).toHaveText(expectedCost);
  });
});
