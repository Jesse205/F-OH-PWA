/**
 * locales/i18n.ts
 *
 * @see https://vue-i18n.intlify.dev/
 */

import EN from '@/locales/en.json'
import ZH_CN from '@/locales/zh-CN.json'
import { getPreferredLocale } from '@/preferences/ui'
import { createI18n } from 'vue-i18n'

type MessageSchema = typeof EN
export type Locales = 'en' | 'zh-CN'

const i18n = createI18n<[MessageSchema], Locales>({
  legacy: false,
  globalInjection: true,
  locale: getPreferredLocale(),
  fallbackLocale: Array.from(navigator.languages),
  messages: {
    en: EN,
    'zh-CN': ZH_CN,
  },
})

export default i18n
