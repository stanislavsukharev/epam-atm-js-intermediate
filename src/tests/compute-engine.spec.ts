import { test, expect } from '../fixtures/fixtures'
import { calculatorTestData } from '../test-data/calculator.data'

test.describe('Cloud Calculator', () => {
  test('should display "Add to estimate" button on load', async ({ calculatorPage }) => {
    await expect(calculatorPage.addEstimateButton).toBeVisible()
  })

  test('should switch currency to Euro and display it', async ({ calculatorPage }) => {
    await calculatorPage.selectCurrency('EUR')
    await expect(calculatorPage.selectedCurrency).toHaveText('EUR')
  })

  test('should display correct result when searching for "Dataflow"', async ({ calculatorPage }) => {
    await calculatorPage.addEstimate()
    await expect(calculatorPage.addEstimationModalWindow).toBeVisible()

    await calculatorPage.searchForService('Dataflow')
    await expect(calculatorPage.getCardByName('Dataflow')).toBeVisible()
  })

  test('should add a new estimate to calculator', async ({ calculatorPage }) => {
    await calculatorPage.addEstimate()
    await expect(calculatorPage.addEstimationModalWindow).toBeVisible()
    await calculatorPage.openComputeEngine()
    await expect(calculatorPage.configurationBlock).toBeVisible()
  })

  test('should add two new instances and check the total cost', async ({ calculatorPage }) => {
    const expectedCost = calculatorTestData.computeEngine.basicEstimate

    await calculatorPage.addEstimate()
    await calculatorPage.openComputeEngine()
    await calculatorPage.incrementInstances(2)
    await expect(calculatorPage.totalCost).toHaveText(expectedCost)
  })
})
