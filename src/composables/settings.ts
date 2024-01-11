import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export const KEY_LOCALE = 'locale'
export const KEY_TOKEN = 'token'
export const KEY_SERVER = 'server'

// 必须声明返回类型，否则会报错 `ts(2742)`

export function useLocaleSetting(): RemovableRef<string> {
  return useLocalStorage<string>('locale', navigator.language)
}

export function useTokenSetting(): RemovableRef<string> {
  return useLocalStorage<string>('token', '')
}

export function useServerSetting(): RemovableRef<string> {
  return useLocalStorage<string>(KEY_SERVER, '')
}
