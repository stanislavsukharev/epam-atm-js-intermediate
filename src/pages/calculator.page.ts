import { BasePage } from "./base.page";
import { Locator, Page } from "@playwright/test";

export class CalculatorPage extends BasePage {
  readonly okCookieButton: Locator;
  readonly addEstimateButton: Locator;
  readonly addEstimationModalWindow: Locator;
  readonly configurationBlock: Locator;
  readonly incrementInstanceButton: Locator;
  readonly totalCost: Locator;
  readonly currencyDropdown: Locator;
  readonly selectedCurrency: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page, "/products/calculator");

    const label = process.env["LOCALE"] === "en" ? "OK, got it" : "OK";

    this.okCookieButton = page.locator(`//*[text()="${label}"]`);
    this.addEstimateButton = page
      .getByRole("button", { name: "Add to estimate" })
      .first();
    this.addEstimationModalWindow = page.locator(
      '[aria-label="Add to this estimate"]'
    );
    this.configurationBlock = page.locator("h2.zv7tnb");
    this.incrementInstanceButton = page
      .locator('div[aria-label="Add to this estimate"]')
      .locator('button[aria-label="Increment"]')
      .first();
    this.totalCost = page.locator(".egBpsb .MyvX5d.D0aEmf");
    this.currencyDropdown = page.getByRole("button", { name: /currency/i });
    this.selectedCurrency = page.locator(
      'button[aria-label*="currency"] span[class*="vQzf8d"]'
    );
    this.searchInput = page.getByPlaceholder("Search by product name");
  }

  async acceptCookies(): Promise<void> {
    if (await this.okCookieButton.isVisible()) {
      await this.okCookieButton.click();
    }
  }

  async addEstimate(): Promise<void> {
    await this.addEstimateButton.waitFor({ state: "visible", timeout: 15000 });
    await this.addEstimateButton.click();
    await this.addEstimationModalWindow.waitFor({
      state: "visible",
      timeout: 15000,
    });
  }

  async openComputeEngine(): Promise<void> {
    const computeEngineCard = this.page
      .getByRole("button")
      .filter({ hasText: "Compute Engine" });

    try {
      await computeEngineCard
        .first()
        .waitFor({ state: "visible", timeout: 15000 });
      await computeEngineCard.first().click();
    } catch (error) {
      await this.page.screenshot({
        path: "compute-engine-not-found.png",
        fullPage: true,
      });
      console.error(
        "Compute Engine card not found. Screenshot saved as compute-engine-not-found.png"
      );
      throw error;
    }

    await this.configurationBlock.waitFor({ state: "visible", timeout: 15000 });
  }

  async incrementInstances(times: number): Promise<void> {
    await this.configurationBlock.waitFor({ state: "visible", timeout: 15000 });

    const incrementButtons = this.page.locator(
      'button[aria-label="Increment"]'
    );
    const count = await incrementButtons.count();

    for (let i = 0; i < count; i++) {
      const button = incrementButtons.nth(i);
      if (await button.isVisible()) {
        for (let j = 0; j < times; j++) {
          await button.click();
        }
        break;
      }
    }

    await this.totalCost.waitFor({ state: "visible", timeout: 15000 });
  }

  async selectCurrency(currencyCode: string): Promise<void> {
    await this.currencyDropdown.click();

    const currencyOption = this.page.locator(
      `li[role="menuitemradio"][data-value="${currencyCode}"]`
    );
    await currencyOption.waitFor({ state: "visible", timeout: 10000 });
    await currencyOption.click();
  }

  async searchForService(service: string): Promise<void> {
    await this.searchInput.fill(service);
    await this.page.waitForTimeout(1000);
  }

  getCardByName(serviceName: string): Locator {
    return this.page.getByRole("heading", { name: serviceName });
  }
}
