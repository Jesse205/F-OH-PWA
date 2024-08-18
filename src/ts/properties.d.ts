/* eslint-disable @typescript-eslint/no-explicit-any */
import '@vue/runtime-core'
import { ComponentCustomProperties as ComponentCustomPropertiesFromVue } from 'vue'
import 'vue-i18n'

declare module '@vue/runtime-core' {
  // 部分库会往 @vue/runtime-core 中添加自定义属性，会导致其他库在 vue 中添加的属性失效，通过此方法可以玄学地解决这个问题。
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface ComponentCustomProperties extends ComponentCustomPropertiesFromVue {
    //TODO: 当Vuetify切换到 `vue` 时删除这些
    $t: any
    $router: any
    $route: any
  }
}
