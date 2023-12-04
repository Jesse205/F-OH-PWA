/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import AppMain from '@/components/AppMain.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Styles
import '@/styles/main.scss'

const app = createApp(App)

registerPlugins(app)
app.component('AppMain', AppMain)

app.mount('#app')
