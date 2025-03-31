import { BasePage } from "./BasePage";

export class CalculatorPage extends BasePage {
  constructor() {
    super("/products/calculator");
  }

  get okCookieButton() {
    const label = process.env["LOCALE"] === "en" ? "OK, got it" : "OK";
    return $(`//*[text()="${label}"]`);
  }

  get addEstimateButton() {
    return $('//span[text()="Add to estimate"]');
  }

  get addEstimationModalWindow() {
    return $('[aria-label="Add to this estimate"]');
  }

  get configurationBlock() {
    return $('h2.zv7tnb');
  }

  get incrementInstanceButton() {
    return $('.QiFlid [aria-label="Increment"] .wX4xVc-Bz112c-RLmnJb');
  }

  get totalCost() {
    return $(".egBpsb .MyvX5d.D0aEmf");
  }

  async acceptCookies() {
    if (await this.okCookieButton.isDisplayed()) {
      await this.okCookieButton.click();
    }
  }

  async addEstimate() {
    await this.addEstimateButton.waitForDisplayed({ timeout: 5000 });
    await this.addEstimateButton.click();
    await this.addEstimationModalWindow.waitForDisplayed({ timeout: 5000 });
  }

  async openComputeEngine() {
    const computeEngineElement = await $('//h2[text()="Compute Engine"]');
    await computeEngineElement.waitForDisplayed({ timeout: 5000 });
    await computeEngineElement.click();
    await this.configurationBlock.waitForDisplayed({ timeout: 15000 });
  }

  async incrementInstances(times: number) {
    const incrementButton = await this.incrementInstanceButton;
    await incrementButton.waitForClickable({ timeout: 5000 });

    for (let i = 0; i < times; i++) {
      await incrementButton.click();
    }

    await this.totalCost.waitForDisplayed({ timeout: 5000 });
  }
}
