export {}

declare module 'vue-router' {
  export interface RouteMeta {
    /**
     * 页面切换动效，在 App.vue 中使用
     */
    transition: string
  }
  export interface HistoryState {
    position?: number
    forward?: string
    back?: string
    current?: string
    scroll?: ScrollToOptions
    // 基于单个元素和路径的滚动配置
    // scroll2?: ScrollToOptions2
  }
}
