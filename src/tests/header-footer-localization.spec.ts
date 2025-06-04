import { test, expect } from '@playwright/test'
import { HeaderFooterPage } from '../pages/header-footer-localization.page'
import { languageExpectations } from '../test-data/language-expectations'

for (const langCode of Object.keys(languageExpectations)) {
  test.describe(`Localization: Header/Footer in [${langCode}]`, () => {
    test(`Should correctly display Header and Footer in [${langCode}]`, async ({ page }) => {
      const hfPage = new HeaderFooterPage(page)

      await hfPage.navigateToLanguage(langCode)

      const { header: expectedHeader, footer: expectedFooter } = languageExpectations[langCode]

      const headerTexts = await hfPage.getHeaderTexts()
      const footerTexts = await hfPage.getFooterTexts()

      for (const expectedText of expectedHeader) {
        expect(headerTexts.join(' ')).toContain(expectedText)
      }
      for (const expectedText of expectedFooter) {
        expect(footerTexts.join(' ')).toContain(expectedText)
      }
    })
  })
}
