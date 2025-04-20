import { test, expect } from '@playwright/test'
import { CloudSqlPage } from '../pages/cloud-sql.page'
import { calculatorTestData } from '../test-data/calculator.data'

let sql: CloudSqlPage

test.describe('[E2E] Cloud SQL', () => {
  test.beforeEach(async ({ page }) => {
    sql = new CloudSqlPage(page)
    await sql.open()
    await sql.openAndInitCloudSql()
    await expect(sql.instancesInput).toBeVisible()
  })

  test('[P1] Create SQL Estimate with Valid Inputs and Share', async () => {
    await sql.selectRegion('South Carolina (us-east1)')
    await sql.fillInstanceBasics({ instances: '5', usageTime: '3650' })
    await sql.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await sql.fillInstanceResources({ vcpus: '8', memory: '15', storage: '200' })
    await sql.assertEstimate(calculatorTestData.cloudSql.P1)
  })

  test('[P2] Max Allowed Configuration Creates Estimate Successfully', async () => {
    await sql.selectRegion('South Carolina (us-east1)')
    await sql.fillInstanceBasics({ instances: '50000', usageTime: '36500000' })
    await sql.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await sql.fillInstanceResources({ vcpus: '96', memory: '624', storage: '65536' })
    await sql.assertEstimate(calculatorTestData.cloudSql.P2)
  })

  test('[P3] Min Allowed Configuration Creates Estimate Successfully', async () => {
    await sql.selectRegion('South Carolina (us-east1)')
    await sql.fillInstanceBasics({ instances: '1', usageTime: '730' })
    await sql.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await sql.fillInstanceResources({ vcpus: '1', memory: '3.75', storage: '1' })
    await sql.assertEstimate(calculatorTestData.cloudSql.P3)
  })

  test('[N1] Estimate With Missing Required Number of Instances', async () => {
    await sql.selectRegion('South Carolina (us-east1)')
    await sql.fillInstanceBasics({ usageTime: '730' })
    await sql.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await sql.fillInstanceResources({ vcpus: '1', memory: '3.75', storage: '1' })
    await sql.instancesInput.fill('')
    await expect(sql.requiredFieldMessage).toBeVisible()
    await expect(sql.totalCost).toHaveText(calculatorTestData.cloudSql.N1)
  })

  test('[N2] Estimate With Invalid Characters In Usage Time Field', async () => {
    await sql.selectRegion('South Carolina (us-east1)')
    await sql.instancesInput.fill('1')
    await sql.usageTimeInput.fill('')
    await sql.usageTimeInput.focus()
    await sql.usageTimeInput.type('abc!@#730')
    await expect(sql.usageTimeInput).toHaveValue('730')
    await sql.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await sql.fillInstanceResources({ vcpus: '1', memory: '3.75', storage: '1' })
    await sql.assertEstimate(calculatorTestData.cloudSql.N2)
  })

  test('[N3] Input Storage Size Over Maximum Limit', async () => {
    await sql.selectRegion('South Carolina (us-east1)')
    await sql.fillInstanceBasics({ instances: '5', usageTime: '3650' })
    await sql.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await sql.fillInstanceResources({ vcpus: '8', memory: '15', storage: '65537' })
    await expect(sql.outOfRangeMessage).toBeVisible()
    await expect(sql.totalCost).toHaveText(calculatorTestData.cloudSql.N3)
  })
})
