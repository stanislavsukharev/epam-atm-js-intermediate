import { Page, Locator } from '@playwright/test'

export class HeaderComponent {
  private headerLinks: Locator

  constructor(private page: Page) {
    this.headerLinks = this.page.locator('header').getByRole('link')
  }

  getAllLinks(): Locator {
    return this.headerLinks
  }
}
