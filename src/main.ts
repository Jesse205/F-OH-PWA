/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import AppMain from '@/components/AppMain.vue'
import { URL_REPOSITORY } from '@/constants/urls'
import { registerPlugins } from '@/plugins'
import '@/styles/main.scss'
import { createApp } from 'vue'
import App from './App.vue'

const TAG_TIP = '💡 Tip:'

console.log(`%c${TAG_TIP} You can go to ${URL_REPOSITORY} to see the source code.`, 'font-weight: bold')

const app = createApp(App)
registerPlugins(app)

// 全局组件
app.component('AppMain', AppMain)

app.mount('#app')
