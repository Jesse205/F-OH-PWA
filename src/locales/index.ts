/**
 * locales/i18n.ts
 *
 * 框架文档: https://vue-i18n.intlify.dev/
 */
import { createI18n } from 'vue-i18n'

import EN from '@/locales/en'
import ZH_CN from '@/locales/zh-CN'
import { useLocaleSetting } from '@/events/settings'

export const APP_NAME_DEFAULT = 'F-OH Lite'
export const APP_NAME_PWA = 'F-OH PWA'
export const APP_NAME_TAURI = 'F-OH Tauri'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: useLocaleSetting().value,
  fallbackLocale: 'en',
  messages: {
    en: EN,
    'zh-CN': ZH_CN
  }
})

export default i18n
