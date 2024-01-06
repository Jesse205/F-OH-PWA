/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import type { App } from 'vue'

import i18n from '@/locales'
import router from '@/router'
import pinia from '@/store'
import vuetify from './vuetify'

export function registerPlugins(app: App) {
  app.use(vuetify).use(i18n).use(router).use(pinia)
}
