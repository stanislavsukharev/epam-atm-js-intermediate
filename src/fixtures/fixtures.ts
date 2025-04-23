import { test as base } from '@playwright/test'
import { CloudSqlPage } from '../pages/cloud-sql.page'
import { CloudStoragePage } from '../pages/cloud-storage.page'
import { CalculatorPage } from '../pages/compute-engine.page'

type MyFixtures = {
  cloudSqlPage: CloudSqlPage
  cloudStoragePage: CloudStoragePage
  calculatorPage: CalculatorPage
}

export const test = base.extend<MyFixtures>({
  cloudSqlPage: async ({ page }, use) => {
    const cloudSqlPage = new CloudSqlPage(page)
    await cloudSqlPage.open()
    await cloudSqlPage.openAndInitCloudSql()
    await use(cloudSqlPage)
  },

  cloudStoragePage: async ({ page }, use) => {
    const cloudStoragePage = new CloudStoragePage(page)
    await cloudStoragePage.open()
    await cloudStoragePage.openAndInitCloudStorage()
    await use(cloudStoragePage)
  },

  calculatorPage: async ({ page }, use) => {
    const calculatorPage = new CalculatorPage(page)
    await calculatorPage.open()
    await calculatorPage.acceptCookies()
    await use(calculatorPage)
  },
})

export { expect } from '@playwright/test'
