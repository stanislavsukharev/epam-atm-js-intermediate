import { test, expect } from '../fixtures/fixtures'
import { calculatorTestData } from '../test-data/calculator.data'

test.describe('Cloud SQL', () => {
  test('Create estimate with valid inputs and share', async ({ cloudSql }) => {
    await cloudSql.selectRegion('South Carolina (us-east1)')
    await cloudSql.fillInstanceBasics({ instances: '5', usageTime: '3650' })
    await cloudSql.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSql.fillInstanceResources({ vcpus: '8', memory: '15', storage: '200' })
    await cloudSql.assertEstimate(calculatorTestData.cloudSql.basicEstimate)
  })

  test('Max allowed configuration creates estimate successfully', async ({ cloudSql }) => {
    await cloudSql.selectRegion('South Carolina (us-east1)')
    await cloudSql.fillInstanceBasics({ instances: '50000', usageTime: '36500000' })
    await cloudSql.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSql.fillInstanceResources({ vcpus: '96', memory: '624', storage: '65536' })
    await cloudSql.assertEstimate(calculatorTestData.cloudSql.maxValuesEstimate)
  })

  test('Min allowed configuration creates estimate successfully', async ({ cloudSql }) => {
    await cloudSql.selectRegion('South Carolina (us-east1)')
    await cloudSql.fillInstanceBasics({ instances: '1', usageTime: '730' })
    await cloudSql.selectInstanceType('db-standard-4 vCPUs: 4, RAM:')
    await cloudSql.fillInstanceResources({ vcpus: '1', memory: '3.75', storage: '1' })
    await cloudSql.assertEstimate(calculatorTestData.cloudSql.minValuesEstimate)
  })

  test('Shows required field message when number of instances is empty', async ({ cloudSql }) => {
    await cloudSql.instancesInput.fill('')
    await expect(cloudSql.requiredFieldMessage).toBeVisible()
  })

  test('Usage time field strips invalid characters', async ({ cloudSql }) => {
    await cloudSql.usageTimeInput.fill('')
    await cloudSql.usageTimeInput.focus()
    await cloudSql.usageTimeInput.type('abc!@#730')
    await expect(cloudSql.usageTimeInput).toHaveValue('730')
  })

  test('Shows out of range message when storage size exceeds maximum', async ({ cloudSql }) => {
    await cloudSql.storageInput.fill('65537')
    await expect(cloudSql.outOfRangeMessage).toBeVisible()
  })
})
