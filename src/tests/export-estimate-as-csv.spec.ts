import { test, expect } from '../fixtures/fixtures';
import { calculatorTestData } from '../test-data/calculator.data';
import { validateDownloadedCsv } from '../utils/csv-utils';

test.describe('Cloud Storage', () => {
  test('Estimate is automatically added and exported correctly to CSV', async ({ cloudStoragePage }) => {
    await cloudStoragePage.selectLocationAndStorageClass();

    await cloudStoragePage.fillEstimateFields({
      totalStorage: '10000',
      dataWritten: '5000',
      dataRead: '46',
      dataRetrieved: '100',
      dataTransferred: '294',
    });

    await cloudStoragePage.selectRegions('Europe', 'Oceania');

    const expectedCost = calculatorTestData.cloudStorage.basicEstimate;
    await expect(cloudStoragePage.totalCost).toHaveText(expectedCost);

    const filePath = await cloudStoragePage.downloadEstimateAsCsv();
    await validateDownloadedCsv(filePath, expectedCost);
  });
});
