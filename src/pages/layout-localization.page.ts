import { Page } from '@playwright/test'
import { BasePage } from './base.page'

export class LayoutLocalizationPage extends BasePage {
  private languageMap: Record<string, string> = {
    en: 'English',
    es: 'Español',
    ja: '日本語',
  }

  constructor(page: Page) {
    super(page, BasePage.CALCULATOR_URL)
  }

  async navigateToPage() {
    await this.page.goto(this.url, { waitUntil: 'networkidle' })
  }

  async dismissOverlays() {
    await this.page
      .getByRole('button', { name: 'No thanks' })
      .click({ timeout: 2000 })
      .catch(() => {})

    const dismissBtn = this.page.locator('div.message-container span.close svg')
    if (await dismissBtn.isVisible()) {
      await dismissBtn.click({ timeout: 2000 })
    }
  }

   async selectLanguage(langCode: string) {
    const languageLabel = this.languageMap[langCode]
    if (!languageLabel) throw new Error(`Unsupported language code: ${langCode}`)
    await this.page.locator('footer').scrollIntoViewIfNeeded()

    await this.page.getByRole('combobox').locator('div').click()
    const options = this.page.getByRole('option')
    await options.filter({ hasText: languageLabel }).first().click()

    if (langCode !== 'en') {
      await this.page.waitForURL(`**/products/calculator?hl=${langCode}`, { timeout: 5000 })
    } else {
      await this.page.waitForLoadState('networkidle')
    }
  }
}
