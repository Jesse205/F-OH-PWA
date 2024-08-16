import { designLanguageCodes, type DesignLanguageCode } from '@/data/settings'

export const KEY_LOCALE = 'locale'
export const KEY_API_URL = 'api-url'
export const KEY_DESIGN = 'design'
export const KEY_PAGE_TRANSITION = 'page-transition'

export function getPreferredLocale(): string {
  return localStorage.getItem(KEY_LOCALE) || navigator.language
}

export function getPreferredDesignLanguage(): DesignLanguageCode {
  const preferred = localStorage.getItem(KEY_DESIGN)
  if (preferred && (designLanguageCodes as string[]).includes(preferred)) {
    return preferred as DesignLanguageCode
  }
  return 'harmony1'
}

export function isPageTransitionEnabled(): boolean {
  return (localStorage.getItem(KEY_PAGE_TRANSITION) ?? 'true') === 'true'
}
