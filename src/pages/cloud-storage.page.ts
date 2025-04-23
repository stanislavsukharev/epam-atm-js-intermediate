import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'

export class CloudStoragePage extends BasePage {
  readonly addEstimateButton: Locator
  readonly cloudStorageCard: Locator
  readonly totalAmountOfStorage: Locator
  readonly totalCost: Locator
  readonly requiredFieldMessage: Locator
  readonly outOfRangeMessage: Locator

  constructor(page: Page) {
    super(page, '/products/calculator')

    this.addEstimateButton = page.getByRole('button', { name: 'Add to estimate' }).first()
    this.cloudStorageCard = page.getByRole('button', { name: 'Cloud Storage Cloud Storage' })
    this.totalAmountOfStorage = page.getByRole('spinbutton', {
      name: 'Total amount of storage',
    })
    this.totalCost = page.locator('span.MyvX5d.D0aEmf')
    this.requiredFieldMessage = page.locator('span', { hasText: 'Required field' })
    this.outOfRangeMessage = page.getByText(
      'Value needs to be greater than 0 and less than or equal to 931,322,574.62 GiB',
    )
  }

  async openAndInitCloudStorage() {
    await this.addEstimateButton.click()
    await this.cloudStorageCard.click()
  }

  async selectLocationAndStorageClass(
    locationType: string = 'Multi-region',
    storageClass: string = 'Nearline Storage',
  ) {
    await this.page.getByRole('combobox', { name: 'Location type' }).locator('div').click()
    await this.page.getByRole('option', { name: locationType }).click()
    await this.page.getByRole('combobox', { name: 'Storage class' }).locator('div').click()
    await this.page.getByRole('option', { name: storageClass }).click()
  }

  async fillEstimateFields({
    totalStorage,
    dataWritten,
    dataRead,
    dataRetrieved,
    dataTransferred,
  }: {
    totalStorage: string
    dataWritten: string
    dataRead: string
    dataRetrieved: string
    dataTransferred: string
  }) {
    await this.totalAmountOfStorage.fill(totalStorage)
    await this.page
      .getByRole('spinbutton', { name: 'Monthly data written tooltip' })
      .fill(dataWritten)
    await this.page.getByRole('spinbutton', { name: 'Monthly data read within' }).fill(dataRead)
    await this.page
      .getByRole('spinbutton', { name: 'Data retrieval amount tooltip' })
      .fill(dataRetrieved)
    await this.page
      .getByRole('spinbutton', { name: 'Data Transfer within Google' })
      .fill(dataTransferred)
  }

  async selectRegions(source: string, destination: string) {
    await this.page.getByRole('combobox', { name: 'Source region' }).locator('div').click()
    await this.page.getByRole('option', { name: source }).click()
    await this.page.getByRole('combobox', { name: 'Destination region' }).locator('div').click()
    await this.page.getByRole('option', { name: destination }).click()
  }

  async openShareDialogAndAssertCost(expectedCost: string) {
    await this.page.getByRole('button', { name: 'Open Share Estimate dialog' }).click()
    await expect(this.page.getByText(`${expectedCost} / month`)).toBeVisible()
    await this.page.getByRole('link', { name: 'Open estimate summary' }).click()
    await expect(this.page.getByText(expectedCost).first()).toBeVisible()
  }
}
