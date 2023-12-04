import type AppMain from '@/components/AppMain.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AppMain: typeof AppMain
  }
}
