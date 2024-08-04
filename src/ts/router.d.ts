import 'vue-router'

declare module 'vue-router' {
  export interface RouteMeta {
    transition: string
    [key: string | number | symbol]: unknown
  }
  export interface HistoryState {
    position: number
    forward?: string
    back?: string
    current?: string
    scroll?: ScrollToOptions
    // 基于单个元素和路径的滚动配置
    scroll2?: ScrollToOptions2
  }
}
