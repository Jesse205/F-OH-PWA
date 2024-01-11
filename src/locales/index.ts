/**
 * locales/i18n.ts
 *
 * 框架文档: https://vue-i18n.intlify.dev/
 */

import { KEY_LOCALE } from '@/composables/settings'
import EN from '@/locales/en.json'
import ZH_CN from '@/locales/zh-CN.json'
import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

export const APP_NAME_DEFAULT = 'F-OH Lite'
export const APP_NAME_PWA = 'F-OH PWA'
export const APP_NAME_TAURI = 'F-OH Tauri'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  // 这里使用钩子竟然也行，不知道是怎么跑起来的。
  locale: localStorage.getItem(KEY_LOCALE) ?? navigator.language,
  fallbackLocale: navigator.languages as Locale[],
  messages: {
    en: EN,
    'zh-CN': ZH_CN,
  },
})

export default i18n
