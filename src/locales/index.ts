/**
 * locales/i18n.ts
 *
 * 框架文档: https://vue-i18n.intlify.dev/
 */
import { createI18n } from 'vue-i18n'
import { getName } from '@tauri-apps/api/app'

import EN from '@/locales/en'
import ZH_CN from '@/locales/zh-CN'
import { isTauri } from '@/util/app'

const SUPPORT_LOCALES = ['en', 'zh-CN']

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    en: EN,
    'zh-CN': ZH_CN
  }
})

// Tauri 有自己的应用名
if (isTauri()) {
  getName().then((name) => {
    EN.appName = name
    ZH_CN.appName = name
  })
}

// i18n.global.setLocaleMessage(locales[0],)
export default i18n
