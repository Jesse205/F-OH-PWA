import type AppMain from '@/components/AppMain.vue'
import type { RouterView } from 'vue-router'
import 'vuetify'

declare module 'vue' {
  export interface GlobalComponents {
    AppMain: typeof AppMain
    RouterView: RouterView
  }
}
