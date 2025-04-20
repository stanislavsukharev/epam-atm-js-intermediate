import { test, expect } from '@playwright/test'
import { CloudStoragePage } from '../pages/cloud-storage.page'
import { calculatorTestData } from '../test-data/calculator.data'

let cloudStorage: CloudStoragePage

test.describe('[E2E] Cloud Storage', () => {
  test.beforeEach(async ({ page }) => {
    cloudStorage = new CloudStoragePage(page)
    await cloudStorage.open()
    await cloudStorage.openAndInitCloudStorage()
    await expect(cloudStorage.totalAmountOfStorage).toBeVisible()
  })

  test('[P1] Basic Cloud Storage Estimate Creation and Share', async () => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.fillEstimateFields({
      totalStorage: '10000',
      dataWritten: '5000',
      dataRead: '46',
      dataRetrieved: '100',
      dataTransferred: '294',
    })
    await cloudStorage.selectRegions('Europe', 'Oceania')
    await expect(cloudStorage.totalCost).toHaveText(calculatorTestData.cloudStorage.P1)
    await cloudStorage.openShareDialogAndAssertCost(calculatorTestData.cloudStorage.P1)
  })

  test('[P2] Upper Edge Input Values Accepted and Estimated Correctly', async () => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.fillEstimateFields({
      totalStorage: '931322574',
      dataWritten: '931322574',
      dataRead: '931322574',
      dataRetrieved: '93132257',
      dataTransferred: '93132257',
    })
    await cloudStorage.selectRegions('Europe', 'Oceania')
    await expect(cloudStorage.totalCost).toHaveText(calculatorTestData.cloudStorage.P2)
    await cloudStorage.openShareDialogAndAssertCost(calculatorTestData.cloudStorage.P2)
  })

  test('[P3] Lower Edge Input Values Accepted and Estimated Correctly', async () => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.fillEstimateFields({
      totalStorage: '1',
      dataWritten: '',
      dataRead: '',
      dataRetrieved: '',
      dataTransferred: '',
    })
    await cloudStorage.selectRegions('Europe', 'Oceania')
    await expect(cloudStorage.totalCost).toHaveText(calculatorTestData.cloudStorage.P3)
    await cloudStorage.openShareDialogAndAssertCost(calculatorTestData.cloudStorage.P3)
  })

  test('[N1] Estimate With Required Fields Missing', async () => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.totalAmountOfStorage.fill('')
    await expect(cloudStorage.requiredFieldMessage).toBeVisible()
    await expect(cloudStorage.totalCost).toHaveText(calculatorTestData.cloudStorage.N1)
  })

  test('[N2] Use Invalid Characters in Numeric Fields', async () => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.totalAmountOfStorage.fill('')
    await cloudStorage.totalAmountOfStorage.focus()
    await cloudStorage.totalAmountOfStorage.type('abc!@#10000')
    await expect(cloudStorage.totalAmountOfStorage).toHaveValue('10000')
    await expect(cloudStorage.totalCost).toHaveText(calculatorTestData.cloudStorage.N2)
  })

  test('[N3] Use Out-of-Range Value in Edge Case', async () => {
    await cloudStorage.selectLocationAndStorageClass()
    await cloudStorage.totalAmountOfStorage.fill('931322575')
    await expect(cloudStorage.outOfRangeMessage).toBeVisible()
    await expect(cloudStorage.totalCost).toHaveText(calculatorTestData.cloudStorage.N3)
  })
})
