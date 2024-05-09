import 'dotenv/config';

import { CalculatorPage } from '../../pageObject/calculator.page';

const chai = require('chai');

const calculatorPage = new CalculatorPage();

const okCookieButton = process.env['LOCALE'] === 'en' ? 'OK, got it' : 'OK';

describe('Cloud Calculator', () => {
  before(async () => {
    // @ts-ignore
    await calculatorPage.open();
    const okButton = await $(`//*[text()="${okCookieButton}"]`);
    await okButton.click();
  });

  it('Should be able to add new entities into the calculator', async () => {
    // @ts-ignore
    await calculatorPage.open();

    const url = await browser.getUrl();
    chai.expect(url).to.be.equal(browser.config.baseUrl + '/products/calculator');

    await expect(calculatorPage.addEstimateButton()).toBeDisplayed();

    const addEstimateButton = await calculatorPage.addEstimateButton();
    addEstimateButton.click();

    const addEstimationModalWindow = await calculatorPage.addEstimationModalWindow();

    await browser.pause(150);
    chai.expect(await addEstimationModalWindow.isDisplayed()).to.be.true;

    const computeEngineElement = await $('//h2[text()="Compute Engine"]');
    await computeEngineElement.click();

    await expect(calculatorPage.configurationBlock()).toBeDisplayed();
  });
});
