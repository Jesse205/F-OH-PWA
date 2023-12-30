import { useLocalStorage } from '@vueuse/core'

export const KEY_SERVER = 'server'

export function useLocaleSetting() {
  return useLocalStorage<string>('locale', navigator.language)
}

export function useTokenSetting() {
  return useLocalStorage<string>('token', '')
}

export function useServerSetting() {
  return useLocalStorage<string>(KEY_SERVER, '')
}
