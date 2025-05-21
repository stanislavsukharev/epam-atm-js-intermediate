import { test, expect } from '../fixtures/fixtures'
import { calculatorTestData } from '../test-data/calculator.data'

test.describe('Cloud Storage', () => {
  test('Basic cloud storage estimate creation and share', async ({ cloudStoragePage }) => {
    await cloudStoragePage.selectLocationAndStorageClass()
    await cloudStoragePage.fillEstimateFields({
      totalStorage: '10000',
      dataWritten: '5000',
      dataRead: '46',
      dataRetrieved: '100',
      dataTransferred: '294',
    })
    await cloudStoragePage.selectRegions('Europe', 'Oceania')
    await expect(cloudStoragePage.totalCost).toHaveText(calculatorTestData.cloudStorage.basicEstimate)
    await cloudStoragePage.openShareDialogAndAssertCost(calculatorTestData.cloudStorage.basicEstimate)
  })

  test('Upper edge input values accepted and estimated correctly', async ({ cloudStoragePage }) => {
    await cloudStoragePage.selectLocationAndStorageClass()
    await cloudStoragePage.fillEstimateFields({
      totalStorage: calculatorTestData.cloudStorage.maxDataValue,
      dataWritten: calculatorTestData.cloudStorage.maxDataValue,
      dataRead: calculatorTestData.cloudStorage.maxDataValue,
      dataRetrieved: calculatorTestData.cloudStorage.maxDataRetrievedAndTransferred,
      dataTransferred: calculatorTestData.cloudStorage.maxDataRetrievedAndTransferred,
    })
    await cloudStoragePage.selectRegions('Europe', 'Oceania')
    await expect(cloudStoragePage.totalCost).toHaveText(
      calculatorTestData.cloudStorage.maxValuesEstimate,
    )
    await cloudStoragePage.openShareDialogAndAssertCost(
      calculatorTestData.cloudStorage.maxValuesEstimate,
    )
  })

  test('Lower edge input values accepted and estimated correctly', async ({ cloudStoragePage }) => {
    await cloudStoragePage.selectLocationAndStorageClass()
    await cloudStoragePage.fillEstimateFields({
      totalStorage: '1',
      dataWritten: '',
      dataRead: '',
      dataRetrieved: '',
      dataTransferred: '',
    })
    await cloudStoragePage.selectRegions('Europe', 'Oceania');
    await expect(cloudStoragePage.totalCost).toHaveText(
      calculatorTestData.cloudStorage.minValuesEstimate,
    )
    await cloudStoragePage.openShareDialogAndAssertCost(
      calculatorTestData.cloudStorage.minValuesEstimate,
    )
  })

  test('Estimate with required fields missing', async ({ cloudStoragePage }) => {
    await cloudStoragePage.selectLocationAndStorageClass()
    await cloudStoragePage.totalAmountOfStorage.fill('')
    await expect(cloudStoragePage.requiredFieldMessage).toBeVisible()
  })

  test('Numeric field strips invalid characters', async ({ cloudStoragePage }) => {
    await cloudStoragePage.selectLocationAndStorageClass()
    await cloudStoragePage.totalAmountOfStorage.fill('')
    await cloudStoragePage.totalAmountOfStorage.focus()
    await cloudStoragePage.totalAmountOfStorage.type('abc!@#10000')
    await expect(cloudStoragePage.totalAmountOfStorage).toHaveValue('10000')
  })

  test('Use out-of-range value in edge case', async ({ cloudStoragePage }) => {
    await cloudStoragePage.selectLocationAndStorageClass()
    await cloudStoragePage.totalAmountOfStorage.fill('931322575')
    await expect(cloudStoragePage.outOfRangeMessage).toBeVisible()
  })
})
