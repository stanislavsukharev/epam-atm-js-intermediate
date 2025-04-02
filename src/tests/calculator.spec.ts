import { test, expect } from '@playwright/test'
import { CalculatorPage } from '../pages/calculator.page'
import { calculatorTestData } from '../test-data/calculator.data'

test.describe('Cloud Calculator', () => {
  let calculatorPage: CalculatorPage

  test.beforeEach(async ({ page }) => {
    calculatorPage = new CalculatorPage(page)
    await calculatorPage.open()
    await calculatorPage.acceptCookies()
  })

  test("should display 'Add to estimate' button on load", async () => {
    await expect(calculatorPage.addEstimateButton).toBeVisible()
  })

  test('should switch currency to Euro and display it', async () => {
    await calculatorPage.selectCurrency('EUR')
    await expect(calculatorPage.selectedCurrency).toHaveText('EUR')
  })

  test('should display correct result when searching for "Dataflow"', async () => {
    await calculatorPage.addEstimate()
    await expect(calculatorPage.addEstimationModalWindow).toBeVisible()

    await calculatorPage.searchForService('Dataflow')
    await expect(calculatorPage.getCardByName('Dataflow')).toBeVisible()
  })

  test('should add a new estimate to calculator', async ({ page }) => {
    expect(page.url()).toContain('/products/calculator')

    await calculatorPage.addEstimate()
    await expect(calculatorPage.addEstimationModalWindow).toBeVisible()

    await calculatorPage.openComputeEngine()
    await expect(calculatorPage.configurationBlock).toBeVisible()
  })

  test('should add two new instances and check the total cost', async () => {
    const expectedCost = calculatorTestData.expectedTotalCost

    await calculatorPage.addEstimate()
    await calculatorPage.openComputeEngine()
    await calculatorPage.incrementInstances(2)
    await expect(calculatorPage.totalCost).toHaveText(expectedCost)
  })
})
