import type { DesignLanguageCode, LanguageCode } from '@/data/settings'
import { KEY_API_URL, KEY_DESIGN, KEY_LOCALE, KEY_PAGE_TRANSITION } from '@/utils/settings'
import type { RemovableRef } from '@vueuse/core'
import { useLocalStorage } from '@vueuse/core'

export function usePreferredLocale(): RemovableRef<LanguageCode | string> {
  return useLocalStorage<LanguageCode | string>(KEY_LOCALE, navigator.language)
}

export function usePreferredApiUrl(): RemovableRef<string> {
  return useLocalStorage<string>(KEY_API_URL, '')
}
export function usePreferredDesignLanguage(): RemovableRef<DesignLanguageCode> {
  return useLocalStorage<DesignLanguageCode>(KEY_DESIGN, 'harmony1')
}

export function usePageTransition(): RemovableRef<boolean> {
  return useLocalStorage<boolean>(KEY_PAGE_TRANSITION, true)
}
