import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'

export class CloudSqlPage extends BasePage {
  readonly addEstimateButton: Locator
  readonly cloudSqlCard: Locator
  readonly regionDropdown: Locator
  readonly regionOption: (regionName: string) => Locator
  readonly instancesInput: Locator
  readonly usageTimeInput: Locator
  readonly instanceTypeDropdown: Locator
  readonly instanceTypeOption: (label: string) => Locator
  readonly vcpuInput: Locator
  readonly memoryInput: Locator
  readonly storageInput: Locator
  readonly totalCost: Locator
  readonly requiredFieldMessage: Locator
  readonly outOfRangeMessage: Locator

  constructor(page: Page) {
    super(page, BasePage.CALCULATOR_URL)

    this.addEstimateButton = page.getByRole('button', { name: 'Add to estimate' }).first()
    this.cloudSqlCard = page.getByRole('button', { name: 'Cloud SQL Google Cloud SQL is' })
    this.regionDropdown = page.getByRole('combobox', { name: 'Region' }).locator('div')
    this.regionOption = (name: string) => page.getByRole('option', { name })
    this.instancesInput = page.getByRole('spinbutton', { name: 'Number of instances' })
    this.usageTimeInput = page.getByRole('spinbutton', { name: 'Total instance usage time' })
    this.instanceTypeDropdown = page
      .getByRole('combobox', { name: 'SQL instance type' })
      .locator('div')
    this.instanceTypeOption = (label: string) => page.getByRole('option', { name: label })
    this.vcpuInput = page.getByRole('spinbutton', { name: 'Number of vCPUs' })
    this.memoryInput = page.getByRole('spinbutton', { name: 'Amount of memory' })
    this.storageInput = page.getByRole('spinbutton', { name: 'Storage (Provisioned Amount' })
    this.totalCost = page.locator('span.MyvX5d.D0aEmf')
    this.requiredFieldMessage = page
      .locator('div:has-text("Required field")')
      .filter({ has: page.locator('text=Required field') })
      .first()
    this.outOfRangeMessage = page.getByText(
      'Value needs to be greater than 0 and less than or equal to 65,536 GiB',
    )
  }

  async openAndInitCloudSql() {
    await this.addEstimateButton.click()
    await this.cloudSqlCard.click()
  }

  async selectRegion(region: string) {
    await this.regionDropdown.click()
    await this.regionOption(region).click()
  }

  async selectInstanceType(label: string) {
    await this.instanceTypeDropdown.click()
    await this.instanceTypeOption(label).click()
  }

  async fillInstanceBasics({ instances, usageTime }: { instances?: string; usageTime: string }) {
    if (instances !== undefined) {
      await this.instancesInput.fill(instances)
    }
    await this.usageTimeInput.fill(usageTime)
  }

  async fillInstanceResources({
    vcpus,
    memory,
    storage,
  }: {
    vcpus: string
    memory: string
    storage: string
  }) {
    await this.vcpuInput.fill(vcpus)
    await this.memoryInput.fill(memory)
    await this.storageInput.fill(storage)
  }

  async assertEstimate(expectedCost: string) {
    await expect(this.totalCost).toHaveText(expectedCost)
    await this.page.getByRole('button', { name: 'Open Share Estimate dialog' }).click()
    await expect(this.page.getByText(`${expectedCost} / month`)).toBeVisible()
    await this.page.getByRole('link', { name: 'Open estimate summary' }).click()
    await expect(this.page.getByText(expectedCost).first()).toBeVisible()
  }

  async assertFullPageScreenshot(filename: string) {
    await this.page.evaluate(() => window.scrollTo(0, 0))
    await this.page.waitForLoadState('networkidle')
    await expect(this.page).toHaveScreenshot(filename, {
      fullPage: true,
    })
  }

  getInstanceTypeDropdown(): Locator {
    return this.page.getByRole('combobox', { name: 'Instance type' })
  }

  async triggerValidation(input: Locator, message: Locator): Promise<void> {
    await input.fill('')

    await this.page
      .locator('header')
      .click()
      .catch(() => {})

    await message.waitFor({ state: 'visible', timeout: 10000 })
  }
}
