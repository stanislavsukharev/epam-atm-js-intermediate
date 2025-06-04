import { test, expect } from '../fixtures/fixtures'

test.describe('Visual Regression - Cloud SQL (Full Page)', () => {
  test('Filled estimate with 5 instances', async ({ cloudSqlPage }) => {
    await cloudSqlPage.selectRegion('South Carolina (us-east1)')
    await cloudSqlPage.fillInstanceBasics({ instances: '4', usageTime: '3655' })
    await cloudSqlPage.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSqlPage.fillInstanceResources({ vcpus: '8', memory: '15', storage: '200' })

    await cloudSqlPage.assertFullPageScreenshot('cloud-sql-estimate-5-instances.png')
  })

  test('Estimate with min values', async ({ cloudSqlPage }) => {
    await cloudSqlPage.selectRegion('South Carolina (us-east1)')
    await cloudSqlPage.fillInstanceBasics({ instances: '1', usageTime: '730' })
    await cloudSqlPage.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSqlPage.fillInstanceResources({ vcpus: '1', memory: '3.75', storage: '1' })

    await cloudSqlPage.assertFullPageScreenshot('cloud-sql-estimate-min-values.png')
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
