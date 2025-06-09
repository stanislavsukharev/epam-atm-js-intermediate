import { Page } from '@playwright/test'
import { BasePage } from './base.page'
import { HeaderComponent } from '../components/header.component'
import { FooterComponent } from '../components/footer.component'

export class HeaderFooterPage extends BasePage {
  readonly header: HeaderComponent
  readonly footer: FooterComponent

  private languageMap: Record<string, string> = {
    en: 'English',
    es: 'Español',
    ja: '日本語',
  }

  constructor(page: Page) {
    super(page, '/products/calculator')
    this.header = new HeaderComponent(page)
    this.footer = new FooterComponent(page)
  }

  async navigateAndSwitchLanguage(langCode: string) {
    const languageLabel = this.languageMap[langCode]
    if (!languageLabel) throw new Error(`Unsupported language code: ${langCode}`)

    await this.page.goto(this.url, { waitUntil: 'networkidle' })

    await this.page
      .getByRole('button', { name: 'No thanks' })
      .click({ timeout: 2000 })
      .catch(() => {})

    const dismissBtn = this.page.locator('div.message-container span.close svg')
    if (await dismissBtn.isVisible().catch(() => false)) {
      await dismissBtn.click({ timeout: 2000 })
    }

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
