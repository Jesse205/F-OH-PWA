export type DesignLanguageCode = 'harmony1' | 'material2' | 'fluent2'

export interface DesignLanguage {
  name: string
  code: DesignLanguageCode
  disabled?: boolean
}

export const designLanguages: DesignLanguage[] = [
  {
    name: 'HarmonyOS Design 1',
    code: 'harmony1',
  },
  {
    name: 'Material Design 2',
    code: 'material2',
  },
  {
    name: 'Fluent Design 2',
    code: 'fluent2',
    disabled: true,
  },
]

export const designLanguageCodes: DesignLanguageCode[] = designLanguages.map(({ code }) => code)

export type LanguageCode = 'zh-CN' | 'en'

export interface Language {
  name: string
  code: LanguageCode
}

export const languages: Language[] = [
  {
    name: '简体中文',
    code: 'zh-CN',
  },
  {
    name: 'English',
    code: 'en',
  },
]
