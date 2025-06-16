import { BasePage } from './base.page'
import { Locator, Page } from '@playwright/test'

export class CalculatorPage extends BasePage {
  readonly okCookieButton: Locator
  readonly addEstimateButton: Locator
  readonly addEstimationModalWindow: Locator
  readonly configurationBlock: Locator
  readonly incrementInstanceButton: Locator
  readonly totalCost: Locator

  readonly searchInput: Locator

  constructor(page: Page) {
    super(page, BasePage.CALCULATOR_URL)

    const label = process.env.LOCALE === 'en' ? 'OK, got it' : 'OK'
    this.okCookieButton = page.getByText(label, { exact: true })

    this.addEstimateButton = page.getByRole('button', { name: 'Add to estimate' }).first()
    this.addEstimationModalWindow = page.getByRole('dialog', { name: /add to this estimate/i })
    this.totalCost = page.locator('.egBpsb .MyvX5d.D0aEmf')

    this.configurationBlock = page.locator('h2.zv7tnb')
    this.incrementInstanceButton = page
      .locator('div[aria-label="Add to this estimate"]')
      .locator('button[aria-label="Increment"]')
      .first()

    this.searchInput = page.getByPlaceholder('Search by product name')
  }

  async acceptCookies(): Promise<void> {
    if (await this.okCookieButton.isVisible()) {
      await this.okCookieButton.click()
    }
  }

  async addEstimate(): Promise<void> {
    await this.addEstimateButton.waitFor({ state: 'visible', timeout: 15_000 })
    await this.addEstimateButton.click()
    await this.addEstimationModalWindow.waitFor({ state: 'visible', timeout: 15_000 })
  }

  async openComputeEngine(): Promise<void> {
    const card = this.page.getByRole('button', { name: /compute engine/i }).first()
    await card.waitFor({ state: 'visible', timeout: 15_000 })
    await card.click()
    await this.configurationBlock.waitFor({ state: 'visible', timeout: 15_000 })
  }

  async incrementInstances(times: number): Promise<void> {
    await this.configurationBlock.waitFor({ state: 'visible', timeout: 15000 })

    const buttons = this.page.locator('button[aria-label="Increment"]')
    for (let i = 0; i < (await buttons.count()); ++i) {
      const btn = buttons.nth(i)
      if (await btn.isVisible()) {
        for (let j = 0; j < times; ++j) await btn.click()
        break
      }
    }
    await this.totalCost.waitFor({ state: 'visible', timeout: 15000 })
  }

  async searchForService(service: string): Promise<void> {
    await this.searchInput.fill(service)
    await this.page.waitForTimeout(1000)
  }

  getCardByName(serviceName: string): Locator {
    return this.page.getByRole('heading', { name: serviceName })
  }
}
