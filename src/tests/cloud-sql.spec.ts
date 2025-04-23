import { test, expect } from '../fixtures/fixtures'
import { calculatorTestData } from '../test-data/calculator.data'

test.describe('Cloud SQL', () => {
  test('Create estimate with valid inputs and share', async ({ cloudSqlPage }) => {
    await cloudSqlPage.selectRegion('South Carolina (us-east1)')
    await cloudSqlPage.fillInstanceBasics({ instances: '5', usageTime: '3650' })
    await cloudSqlPage.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSqlPage.fillInstanceResources({ vcpus: '8', memory: '15', storage: '200' })
    await cloudSqlPage.assertEstimate(calculatorTestData.cloudSql.basicEstimate)
  })

  test('Max allowed configuration creates estimate successfully', async ({ cloudSqlPage }) => {
    await cloudSqlPage.selectRegion('South Carolina (us-east1)')
    await cloudSqlPage.fillInstanceBasics({ instances: '50000', usageTime: '36500000' })
    await cloudSqlPage.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSqlPage.fillInstanceResources({ vcpus: '96', memory: '624', storage: '65536' })
    await cloudSqlPage.assertEstimate(calculatorTestData.cloudSql.maxValuesEstimate)
  })

  test('Min allowed configuration creates estimate successfully', async ({ cloudSqlPage }) => {
    await cloudSqlPage.selectRegion('South Carolina (us-east1)')
    await cloudSqlPage.fillInstanceBasics({ instances: '1', usageTime: '730' })
    await cloudSqlPage.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSqlPage.fillInstanceResources({ vcpus: '1', memory: '3.75', storage: '1' })
    await cloudSqlPage.assertEstimate(calculatorTestData.cloudSql.minValuesEstimate)
  })

  test('Shows required field message when number of instances is empty', async ({ cloudSqlPage }) => {
    await cloudSqlPage.instancesInput.fill('')
    await expect(cloudSqlPage.requiredFieldMessage).toBeVisible()
  })

  test('Usage time field strips invalid characters', async ({ cloudSqlPage }) => {
    await cloudSqlPage.usageTimeInput.fill('')
    await cloudSqlPage.usageTimeInput.focus()
    await cloudSqlPage.usageTimeInput.type('abc!@#730')
    await expect(cloudSqlPage.usageTimeInput).toHaveValue('730')
  })

  test('Shows out of range message when storage size exceeds maximum', async ({ cloudSqlPage }) => {
    await cloudSqlPage.storageInput.fill('65537')
    await expect(cloudSqlPage.outOfRangeMessage).toBeVisible()
  })
})
