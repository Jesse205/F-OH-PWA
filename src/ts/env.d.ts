/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/vue" />
/// <reference lib="webworker" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  FOHPWA_HOST_WEB: string

  /**
   * 应用源代码地址
   */
  FOHPWA_URL_SOURCE: string

  FOHPWA_URL_API_WEB: string
  FOHPWA_URL_API_WEB_ORIGIN: string
  FOHPWA_URL_API_CLIENT: string
  FOHPWA_URL_API_CLIENT_ORIGIN: string
}
