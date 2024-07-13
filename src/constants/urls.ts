import { completeUrl } from '@/utils/url'

const {
  FOHPWA_URL_API_WEB,
  FOHPWA_URL_API_WEB_ORIGIN,
  FOHPWA_URL_API_CLIENT,
  FOHPWA_URL_API_CLIENT_ORIGIN,
  FOHPWA_HOST_WEB,
  FOHPWA_URL_SOURCE,
} = import.meta.env

/**
 * Web 端域名，用于在客户端内提供网页链接使用
 */
export const HOST_WEB = FOHPWA_HOST_WEB

/**
 * Web 端使用的 API 地址
 */
export const URL_API_WEB = completeUrl(FOHPWA_URL_API_WEB)

/**
 * Web 端使用的 API 地址
 */
export const URL_API_WEB_ORIGIN = completeUrl(FOHPWA_URL_API_WEB_ORIGIN)

/**
 * 客户端使用的 API 地址
 */
export const URL_API_CLIENT = completeUrl(FOHPWA_URL_API_CLIENT)

/**
 * 客户端使用的原始 API 地址
 */
export const URL_API_CLIENT_ORIGIN = completeUrl(FOHPWA_URL_API_CLIENT_ORIGIN)

/**
 * 首页配置 API，相对路径
 */
export const URL_API_HOME_RELATIVE = '/homePageData.json'

/**
 * 所有应用 API，相对路径
 */
export const URL_API_ALL_APP_RELATIVE = '/allAppList.json'

/**
 * 源代码仓库地址
 */
export const URL_SOURCE = FOHPWA_URL_SOURCE
