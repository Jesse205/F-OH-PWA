/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Styles
import '@/styles/main.scss'
import '@/styles/overlays.scss'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
