import { designLanguageCodes, type DesignLanguageCode } from '@/data/settings'

export const KEY_LOCALE = 'locale'
export const KEY_SERVER = 'server'
export const KEY_DESIGN = 'design'
export const KEY_PAGE_TRANSITION = 'page-transition'

export function getPreferredServerUrl(): string | null {
  return localStorage.getItem(KEY_SERVER)?.trim() ?? null
}

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

export function setPreferredDesignLanguage(code: DesignLanguageCode) {
  localStorage.setItem(KEY_DESIGN, code)
}

export function isPageTransitionEnabled(): boolean {
  return localStorage.getItem(KEY_PAGE_TRANSITION) === 'true'
}
