/* eslint-disable no-unused-vars */
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  VITE_HOST_WEB: string
  VITE_HOST_SERVER: string
  /**
   * 浏览器环境使用的 F-OH API，用于解决跨域等问题
   */
  VITE_URL_API: string
  /**
   * 客户端使用的 F-OH API，必须通过私有 http 方法访问数据。
   */
  VITE_URL_API_LEGACY: string
  /**
   * F-OH 服务器的 GOGS API
   */
  VITE_URL_API_GOGS: string
  VITE_URL_UPLOAD: string
}
