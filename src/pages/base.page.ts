import { Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';

export abstract class BasePage {
  static readonly CALCULATOR_URL = '/products/calculator';
  readonly header = new HeaderComponent(this.page);
  readonly footer = new FooterComponent(this.page);

  constructor(protected readonly page: Page, protected readonly url: string) {}

  get isMobile(): boolean {
    const size = this.page.viewportSize();
    return !!size && size.width < 768;
  }

  async open(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: 'load' });
    const agree = this.page.getByRole('button', { name: 'Agree' });
    if (await agree.isVisible({ timeout: 3_000 })) {
      await agree.click();
    }
  }
}
