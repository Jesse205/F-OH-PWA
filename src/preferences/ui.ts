import { designLanguageCodes, type DesignLanguageCode, type LanguageCode } from '@/data/settings'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export const KEY_LOCALE = 'locale'
export const KEY_DESIGN = 'design'
export const KEY_PAGE_TRANSITION = 'page-transition'

// #region Locale
export function getPreferredLocale(): string {
  return localStorage.getItem(KEY_LOCALE) || navigator.language
}
export function usePreferredLocale(): RemovableRef<LanguageCode | string> {
  return useLocalStorage<LanguageCode | string>(KEY_LOCALE, navigator.language)
}
//#endregion

// #region DesignLanguage
export function getPreferredDesignLanguage(): DesignLanguageCode {
  const preferred = localStorage.getItem(KEY_DESIGN)
  if (preferred && (designLanguageCodes as string[]).includes(preferred)) {
    return preferred as DesignLanguageCode
  }
  return 'harmony1'
}
export function usePreferredDesignLanguage(): RemovableRef<DesignLanguageCode> {
  return useLocalStorage<DesignLanguageCode>(KEY_DESIGN, 'harmony1')
}
//#endregion

// #region PageTransition
export function isPageTransitionEnabled(): boolean {
  return (localStorage.getItem(KEY_PAGE_TRANSITION) ?? 'true') === 'true'
}
export function usePageTransition(): RemovableRef<boolean> {
  return useLocalStorage<boolean>(KEY_PAGE_TRANSITION, true)
}
//#endregion
