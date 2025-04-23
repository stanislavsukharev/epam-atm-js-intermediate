import { test as base } from '@playwright/test'
import { CloudSqlPage } from '../pages/cloud-sql.page'
import { CloudStoragePage } from '../pages/cloud-storage.page'
import { CalculatorPage } from '../pages/compute-engine.page'

type MyFixtures = {
  cloudSql: CloudSqlPage
  cloudStorage: CloudStoragePage
  calculatorPage: CalculatorPage
}

export const test = base.extend<MyFixtures>({
  cloudSql: async ({ page }, use) => {
    const cloudSql = new CloudSqlPage(page)
    await cloudSql.open()
    await cloudSql.openAndInitCloudSql()
    await use(cloudSql)
  },

  cloudStorage: async ({ page }, use) => {
    const cloudStorage = new CloudStoragePage(page)
    await cloudStorage.open()
    await cloudStorage.openAndInitCloudStorage()
    await use(cloudStorage)
  },

  calculatorPage: async ({ page }, use) => {
    const calculatorPage = new CalculatorPage(page)
    await calculatorPage.open()
    await calculatorPage.acceptCookies()
    await use(calculatorPage)
  },
})

export { expect } from '@playwright/test'
