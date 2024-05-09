import { BasePage } from './base.page';

export class CalculatorPage extends BasePage {
  constructor() {
    super('/products/calculator');
  }

  welcomeElement() {
    return $('.Gxwdcd');
  }

  async addEstimateButton() {
    const welcomeElement = await this.welcomeElement();
    return welcomeElement.$('//span[text()="Add to estimate"]');
  }

  addEstimationModalWindow() {
    return $('[aria-label="Add to this estimate"]');
  }

  configurationBlock() {
    return $('span.U4lDT');
  }
}
