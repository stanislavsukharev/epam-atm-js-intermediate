import { Page } from '@playwright/test'
import { HeaderComponent } from '../components/header.component'
import { FooterComponent } from '../components/footer.component'

export class BasePage {
  static readonly CALCULATOR_URL = '/products/calculator'
  
  constructor(
    protected readonly page: Page,
    protected readonly url: string,
  ) {}

  readonly header = new HeaderComponent(this.page)
  readonly footer = new FooterComponent(this.page)

  async open() {
    await this.page.goto(this.url)
  }
}
