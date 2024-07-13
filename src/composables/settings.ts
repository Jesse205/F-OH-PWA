import type { DesignLanguageCode, LanguageCode } from '@/data/settings'
import { KEY_DESIGN, KEY_LOCALE, KEY_PAGE_TRANSITION, KEY_SERVER } from '@/utils/settings'
import type { RemovableRef } from '@vueuse/core'
import { useLocalStorage } from '@vueuse/core'

export function usePreferredLocale(): RemovableRef<LanguageCode | string> {
  return useLocalStorage<LanguageCode | string>(KEY_LOCALE, navigator.language)
}

export function usePreferredServerUrl(): RemovableRef<string> {
  return useLocalStorage<string>(KEY_SERVER, '')
}
export function usePreferredDesignLanguage(): RemovableRef<DesignLanguageCode> {
  return useLocalStorage<DesignLanguageCode>(KEY_DESIGN, 'harmony1')
}

export function usePageTransition(): RemovableRef<boolean> {
  return useLocalStorage<boolean>(KEY_PAGE_TRANSITION, true)
}
