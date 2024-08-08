import { designLanguageCodes, type DesignLanguageCode } from '@/data/settings'

export const KEY_LOCALE = 'locale'
const KEY_SERVER = 'server'
export const KEY_API_URL = 'api-url'
export const KEY_DESIGN = 'design'
export const KEY_PAGE_TRANSITION = 'page-transition'

/**
 *
 * @deprecated
 */
export function getPreferredServerUrl(): string | null {
  return localStorage.getItem(KEY_SERVER)?.trim() ?? null
}

/**
 *
 * @deprecated
 */
export function removePreferredServerUrl() {
  localStorage.removeItem(KEY_SERVER)
}

export function getPreferredApiUrl(): string {
  return localStorage.getItem(KEY_API_URL)?.trim() ?? ''
}

export function setPreferredApiUrl(apiUrl: string) {
  return localStorage.setItem(KEY_API_URL, apiUrl)
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

export function isPageTransitionEnabled(): boolean {
  return (localStorage.getItem(KEY_PAGE_TRANSITION) ?? 'true') === 'true'
}
