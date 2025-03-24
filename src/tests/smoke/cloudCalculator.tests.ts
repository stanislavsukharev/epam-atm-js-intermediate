import { CalculatorPage } from "../../pageObjects/CalculatorPage";

const calculatorPage = new CalculatorPage();

describe("Cloud Calculator", () => {
  before(async () => {
    await calculatorPage.open();
    await calculatorPage.acceptCookies();
  });

  it("should add a new estimate to calculator", async () => {
    await calculatorPage.open();

    const url = await browser.getUrl();
    expect(url).toBe(`${browser.options.baseUrl}/products/calculator`);

    await calculatorPage.addEstimate();
    await expect(calculatorPage.addEstimationModalWindow).toBeDisplayed();

    await calculatorPage.openComputeEngine();
    await calculatorPage.configurationBlock.waitForDisplayed();
  });

  it("should add two new instances and check the total cost", async () => {
    const expectedCost = "$419.10";

    await calculatorPage.incrementInstances(2);
    await calculatorPage.totalCost.waitForDisplayed();

    await expect(calculatorPage.totalCost).toHaveText(expectedCost);
  });
});
