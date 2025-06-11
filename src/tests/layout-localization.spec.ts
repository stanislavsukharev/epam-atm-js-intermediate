import { test, expect } from '@playwright/test'
import { LayoutLocalizationPage } from '../pages/layout-localization.page'
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
      const layoutLocalizationPage = new LayoutLocalizationPage(page)
      await layoutLocalizationPage.navigateToPage()
      await layoutLocalizationPage.dismissOverlays()
      await layoutLocalizationPage.selectLanguage(languageCode)

      const { header: expectedHeaderTexts, footer: expectedFooterTexts } =
        languageExpectations[languageCode]

      await expect(
        layoutLocalizationPage.header.getAllLinks().filter({ hasText: expectedHeaderTexts[0] }),
      ).toHaveText([expectedHeaderTexts[0]], { ignoreCase: true })

      await expect(
        layoutLocalizationPage.footer.getAllLinks().filter({ hasText: expectedFooterTexts[0] }),
      ).toHaveText([expectedFooterTexts[0]], { ignoreCase: true })
    })
  })
}
