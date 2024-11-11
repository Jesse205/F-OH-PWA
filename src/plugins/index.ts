/**
 * plugins/index.ts
 *
 * 自动包含在 `./src/main.ts` 中
 */

import type { App } from 'vue'

import i18n from '@/locales'
import router from '@/router'
import pinia from '@/store'
import themes from '@/themes'

import vuetify from './vuetify'

export function registerPlugins(app: App): void {
  app.use(themes).use(vuetify).use(i18n).use(router).use(pinia)
}
