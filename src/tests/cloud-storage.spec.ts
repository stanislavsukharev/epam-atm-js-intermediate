import { test, expect } from '../fixtures/fixtures'
import { calculatorTestData } from '../test-data/calculator.data'

test.describe('Cloud Storage', () => {
  test('Basic cloud storage estimate creation and share', async ({ cloudStorage }) => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.fillEstimateFields({
      totalStorage: '10000',
      dataWritten: '5000',
      dataRead: '46',
      dataRetrieved: '100',
      dataTransferred: '294',
    })
    await cloudStorage.selectRegions('Europe', 'Oceania')
    await expect(cloudStorage.totalCost).toHaveText(calculatorTestData.cloudStorage.basicEstimate)
    await cloudStorage.openShareDialogAndAssertCost(calculatorTestData.cloudStorage.basicEstimate)
  })

  test('Upper edge input values accepted and estimated correctly', async ({ cloudStorage }) => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.fillEstimateFields({
      totalStorage: calculatorTestData.cloudStorage.maxDataValue,
      dataWritten: calculatorTestData.cloudStorage.maxDataValue,
      dataRead: calculatorTestData.cloudStorage.maxDataValue,
      dataRetrieved: calculatorTestData.cloudStorage.maxDataRetrievedAndTransferred,
      dataTransferred: calculatorTestData.cloudStorage.maxDataRetrievedAndTransferred,
    })
    await cloudStorage.selectRegions('Europe', 'Oceania')
    await expect(cloudStorage.totalCost).toHaveText(calculatorTestData.cloudStorage.maxValuesEstimate)
    await cloudStorage.openShareDialogAndAssertCost(calculatorTestData.cloudStorage.maxValuesEstimate)
  })

  test('Lower edge input values accepted and estimated correctly', async ({ cloudStorage }) => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.fillEstimateFields({
      totalStorage: '1',
      dataWritten: '',
      dataRead: '',
      dataRetrieved: '',
      dataTransferred: '',
    })
    await cloudStorage.selectRegions('Europe', 'Oceania')
    await expect(cloudStorage.totalCost).toHaveText(calculatorTestData.cloudStorage.minValuesEstimate)
    await cloudStorage.openShareDialogAndAssertCost(calculatorTestData.cloudStorage.minValuesEstimate)
  })

  test('Estimate with required fields missing', async ({ cloudStorage }) => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.totalAmountOfStorage.fill('')
    await expect(cloudStorage.requiredFieldMessage).toBeVisible()
  })

  test('Numeric field strips invalid characters', async ({ cloudStorage }) => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.totalAmountOfStorage.fill('')
    await cloudStorage.totalAmountOfStorage.focus()
    await cloudStorage.totalAmountOfStorage.type('abc!@#10000')
    await expect(cloudStorage.totalAmountOfStorage).toHaveValue('10000')
  })

  test('Use out-of-range value in edge case', async ({ cloudStorage }) => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.totalAmountOfStorage.fill('931322575')
    await expect(cloudStorage.outOfRangeMessage).toBeVisible()
  })
})
