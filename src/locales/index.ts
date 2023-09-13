/**
 * locales/i18n.ts
 *
 * 框架文档: https://vue-i18n.intlify.dev/
 */
import { createI18n } from 'vue-i18n'
import { getName } from '@tauri-apps/api/app'

import EN from '@/locales/en'
import ZH_CN from '@/locales/zh-CN'
import { isPwa, isTauri } from '@/util/app'
import { useLocaleSetting } from '@/events/settings'

const SUPPORT_LOCALES = ['en', 'zh-CN']

const APP_NAME_DEFAULT = 'F-OH Lite'
const APP_NAME_PWA = 'F-OH PWA'
const APP_NAME_TAURI = 'F-OH Tauri'

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

// 设置应用名

if (isTauri()) {
  // Tauri
  EN.appName = APP_NAME_TAURI
  ZH_CN.appName = APP_NAME_TAURI
  getName().then(name => {
    EN.appName = name
    ZH_CN.appName = name
  })
} else if (isPwa()) {
  // PWA
  EN.appName = APP_NAME_PWA
  ZH_CN.appName = APP_NAME_PWA
} else {
  // 网页
  EN.appName = APP_NAME_DEFAULT
  ZH_CN.appName = APP_NAME_DEFAULT
}

export default i18n
