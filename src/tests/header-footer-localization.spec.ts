import { test, expect } from '@playwright/test'
import { HeaderFooterPage } from '../pages/header-footer-localization.page'
import {
  languageExpectations,
  defaultLanguages,
  LanguageCode,
} from '../test-data/language-expectations.data'

const requested = process.env.TEST_LANGUAGES
const languagesToTest = (
  requested ? requested.split(',').map((l) => l.trim() as LanguageCode) : defaultLanguages
).filter((lang) => lang in languageExpectations)

for (const languageCode of languagesToTest) {
  test.describe(`Localization: Header/Footer in [${languageCode}]`, () => {
    test(`Should correctly display Header and Footer in [${languageCode}]`, async ({ page }) => {
      const headerFooterPage = new HeaderFooterPage(page)
      await headerFooterPage.navigateAndSwitchLanguage(languageCode)

      const { header: expectedHeaderTexts, footer: expectedFooterTexts } =
        languageExpectations[languageCode]

      for (const expectedText of expectedHeaderTexts) {
        const linkLocator = headerFooterPage.header.getAllLinks().filter({ hasText: expectedText })

        await expect(linkLocator).toHaveText([expectedText], { ignoreCase: true })
      }

      for (const expectedText of expectedFooterTexts) {
        const linkLocator = headerFooterPage.footer.getAllLinks().filter({ hasText: expectedText })

        await expect(linkLocator).toHaveText([expectedText], { ignoreCase: true })
      }
    })
  })
}
