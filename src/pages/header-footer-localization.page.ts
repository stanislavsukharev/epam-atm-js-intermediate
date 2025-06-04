import { Page } from '@playwright/test'
import { BasePage } from './base.page'

export class HeaderFooterPage extends BasePage {
  private languageMap: Record<string, string> = {
    en: 'English',
    es: 'Español',
    ja: '日本語',
  }

  constructor(page: Page) {
    super(page, '/products/calculator')
  }

  async closeOverlays() {
    await this.page
      .locator('button:has-text("No thanks")')
      .first()
      .click({ timeout: 2_000 })
      .catch(() => {})
  }

  async navigateToLanguage(langCode: string) {
    await this.page.goto(`${this.url}?hl=${langCode}`, {
      waitUntil: 'networkidle',
    })
    await this.closeOverlays()
  }

  async getHeaderTexts(): Promise<string[]> {
    return this.page.locator('header').getByRole('link').allTextContents()
  }

  async getFooterTexts(): Promise<string[]> {
    return this.page.locator('footer').getByRole('link').allTextContents()
  }
}
