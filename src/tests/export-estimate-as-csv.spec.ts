import { test } from '../fixtures/fixtures'
import { calculatorTestData } from '../test-data/calculator.data'

test.describe('Cloud Storage', () => {
  test('Estimate is exported correctly to CSV', async ({ cloudStoragePage }) => {
    await cloudStoragePage.selectLocationAndStorageClass()
    await cloudStoragePage.fillEstimateFields({
      totalStorage: '10000',
      dataWritten: '5000',
      dataRead: '46',
      dataRetrieved: '100',
      dataTransferred: '294',
    })
    await cloudStoragePage.selectRegions('Europe', 'Oceania')

    await cloudStoragePage.waitForEstimateToUpdate();

    const filePath = await cloudStoragePage.downloadEstimateAsCsv()
    const rows = cloudStoragePage.readCsvFile(filePath)
    cloudStoragePage.validateCsvCost(rows, calculatorTestData.cloudStorage.basicEstimate)
    cloudStoragePage.removeFile(filePath)
  })
})
