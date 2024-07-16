/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import AppMain from '@/components/AppMain.vue'
import { URL_SOURCE } from '@/constants/urls'
import { registerPlugins } from '@/plugins'
import '@/styles/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { isClientApp, isTauriApp } from './utils/app'
import { upgrade } from './utils/upgrade'

upgrade()

const TAG_TIP = '💡 Tip:'

console.log(`%c${TAG_TIP} You can go to ${URL_SOURCE} to see the source code.`, 'font-weight: bold')

// APP 模式
console.debug('isTauriApp', isTauriApp)
console.debug('isClientApp', isClientApp)

const app = createApp(App)

registerPlugins(app)

// 全局组件
app.component('AppMain', AppMain)

app.mount('#app')
