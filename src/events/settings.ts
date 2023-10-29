import { RemovableRef, useLocalStorage } from '@vueuse/core'

export function useLocaleSetting(): RemovableRef<string> {
  return useLocalStorage('locale', navigator.language)
}

export function useToken(): RemovableRef<string | null> {
  return useLocalStorage('token', null)
}
