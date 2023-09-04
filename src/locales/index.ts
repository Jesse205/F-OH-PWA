/**
 * locales/i18n.ts
 *
 * 框架文档: https://vue-i18n.intlify.dev/
 */
import { createI18n } from 'vue-i18n'

import EN from '@/locales/en'
import ZH_CN from '@/locales/zh-CN'

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    en: EN,
    'zh-CN': ZH_CN
  }
})
