/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/vue" />
/// <reference lib="webworker" />
import 'vue-router'

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  /**
   * Web 端域名，用于在客户端内提供网页链接使用
   */
  FOHPWA_HOST_WEB: string

  /**
   * 源代码仓库地址
   */
  FOHPWA_URL_SOURCE: string
  /**
   *Web 端使用的 API 地址，供直接请求使用
   */
  FOHPWA_URL_API_WEB: string
  /**
   *Web 端使用的原始 API 地址，供直接访问使用
   */
  FOHPWA_URL_API_WEB_ORIGIN: string
  /**
   *  客户端使用的 API 地址，供直接请求使用
   */
  FOHPWA_URL_API_CLIENT: string
  /**
   *  客户端使用的原始 API 地址，供直接访问使用
   */
  FOHPWA_URL_API_CLIENT_ORIGIN: string
}

declare module 'vue-router' {
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
