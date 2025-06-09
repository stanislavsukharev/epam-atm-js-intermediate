export const languageExpectations: Record<string, Record<string, string[]>> = {
  en: {
    header: ['Pricing'],
    footer: ['Google Cloud terms'],
  },
  es: {
    header: ['Precios'],
    footer: ['Términos de Google Cloud'],
  },
  ja: {
    header: ['料金'],
    footer: ['Google Cloud の用語'],
  },
}

export const defaultLanguages = ['en', 'es'] as const
export type LanguageCode = keyof typeof languageExpectations
