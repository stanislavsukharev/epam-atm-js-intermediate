import { test, expect } from '../fixtures/fixtures'

test.describe('Visual Regression - Cloud SQL (Full Page)', () => {
  test('Filled estimate with 5 instances', async ({ cloudSqlPage }) => {
    await cloudSqlPage.selectRegion('South Carolina (us-east1)')
    await cloudSqlPage.fillInstanceBasics({ instances: '5', usageTime: '3650' })
    await cloudSqlPage.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSqlPage.fillInstanceResources({ vcpus: '8', memory: '15', storage: '200' })

    await cloudSqlPage.assertFullPageScreenshot('cloud-sql-estimate-5-instances.png')
  })

  test('Estimate with max values', async ({ cloudSqlPage }) => {
    await cloudSqlPage.selectRegion('South Carolina (us-east1)')
    await cloudSqlPage.fillInstanceBasics({ instances: '50000', usageTime: '36500000' })
    await cloudSqlPage.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSqlPage.fillInstanceResources({ vcpus: '96', memory: '624', storage: '65536' })

    await cloudSqlPage.assertFullPageScreenshot('cloud-sql-estimate-max-values.png')
  })
})

test.describe('Visual Regression - Cloud SQL (Web Elements)', () => {
  test('Should match "Add to estimate" button visually', async ({ cloudSqlPage }) => {
    const addToEstimateButton = cloudSqlPage.addEstimateButton
    await expect(addToEstimateButton).toHaveScreenshot('cloud-sql-add-to-estimate-button.png')
  })

  test('Matches instance type dropdown visually', async ({ cloudSqlPage }) => {
    await cloudSqlPage.selectRegion('South Carolina (us-east1)')
    const dropdown = cloudSqlPage.getInstanceTypeDropdown()
    await dropdown.click()

    await expect(dropdown).toHaveScreenshot('cloud-sql-instance-type-dropdown.png')
  })
})
