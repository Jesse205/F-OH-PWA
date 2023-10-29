import { useLocalStorage } from '@vueuse/core'

export function useLocaleSetting() {
  return useLocalStorage<string>('locale', navigator.language)
}

export function useToken() {
  return useLocalStorage<string>('token', '')
}
