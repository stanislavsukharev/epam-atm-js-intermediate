import { Page, Locator } from '@playwright/test'

export class FooterComponent {
  private footerLinks: Locator

  constructor(private page: Page) {
    this.footerLinks = this.page.locator('footer').getByRole('link')
  }

  getAllLinks(): Locator {
    return this.footerLinks
  }
}
