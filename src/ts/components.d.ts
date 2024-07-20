
import 'vuetify'
import type AppMain from '@/components/AppMain.vue'
import type { RouterView } from 'vue-router'

declare module 'vue' {
  export interface GlobalComponents {
    AppMain: typeof AppMain
    RouterView: RouterView
  }
}
