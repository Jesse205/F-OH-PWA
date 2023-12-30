import { getCompletePath } from '@/util/url'
import { isLegacyApp } from '@/util/app'

// env
const { VITE_URL_API, VITE_URL_API_LEGACY, VITE_URL_UPLOAD, VITE_URL_API_GOGS, VITE_HOST_WEB } = import.meta.env

export const HOST_WEB = VITE_HOST_WEB

/**
 * F-OH 的 API 地址，自动判断当前运行环境和用户设置。
 */
export const URL_API = getCompletePath(isLegacyApp ? VITE_URL_API_LEGACY : VITE_URL_API)

/**
 * F-OH 的 API 地址，原始的链接
 */
export const URL_API_LEGACY = getCompletePath(VITE_URL_API_LEGACY)

/**
 * F-OH 服务器的 GOGS API
 */
export const URL_API_GOGS = VITE_URL_API_GOGS

/**
 * 首页配置 API，相对路径
 */
export const URL_API_HOME_RELATIVE = '/homePageData.json'

/**
 * 所有应用 API，相对路径
 */
export const URL_API_ALL_APP_LIST_RELATIVE = '/allAppList.json'

/**
 * 应用上传
 */
export const URL_UPLOAD = VITE_URL_UPLOAD

export const IS_DEV_MODE = import.meta.env.DEV
