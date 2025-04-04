import { Page } from '@playwright/test'

export class BasePage {
  constructor(
    protected readonly page: Page,
    protected readonly url: string,
  ) {}

  async open() {
    await this.page.goto(this.url)
  }
}
