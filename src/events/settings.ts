import { useLocalStorage } from '@vueuse/core'

export function useLocaleSetting() {
  return useLocalStorage<string>('locale', navigator.language)
}

export function useTokenSetting() {
  return useLocalStorage<string>('token', '')
}
