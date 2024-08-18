import { ComponentCustomProperties as NewComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  // 部分库会往 @vue/runtime-core 中添加自定义属性，会导致其他库在 vue 中添加的属性失效，通过此方法可以玄学地解决这个问题。
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface ComponentCustomProperties extends NewComponentCustomProperties {}
}
