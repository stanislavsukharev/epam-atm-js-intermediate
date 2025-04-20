import { test, expect } from '@playwright/test'
import { CalculatorPage } from '../pages/compute-engine.page'
import { calculatorTestData } from '../test-data/calculator.data'

let calculatorPage: CalculatorPage

test.describe('Cloud Calculator', () => {
  test.beforeEach(async ({ page }) => {
    calculatorPage = new CalculatorPage(page)
    await calculatorPage.open()
    await calculatorPage.acceptCookies()
    await expect(calculatorPage.addEstimateButton).toBeVisible()
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

  test('should add a new estimate to calculator', async () => {
    await calculatorPage.addEstimate()
    await expect(calculatorPage.addEstimationModalWindow).toBeVisible()
    await calculatorPage.openComputeEngine()
    await expect(calculatorPage.configurationBlock).toBeVisible()
  })

  test('should add two new instances and check the total cost', async () => {
    const expectedCost = calculatorTestData.computeEngine.expectedTotalCost

    await calculatorPage.addEstimate()
    await calculatorPage.openComputeEngine()
    await calculatorPage.incrementInstances(2)
    await expect(calculatorPage.totalCost).toHaveText(expectedCost)
  })
})
