import { getCompletePath, getServerCompletePath } from '@/util/url'
import { isLegacyApp } from '@/util/app'

// env
const { VITE_URL_API, VITE_URL_API_LEGACY, VITE_URL_UPLOAD, VITE_URL_API_GOGS, VITE_HOST_WEB } = import.meta.env

export const HOST_WEB = VITE_HOST_WEB

/**
 * F-OH 的 API 地址，自动判断当前运行环境。
 */
export const URL_API = getCompletePath(isLegacyApp() ? VITE_URL_API_LEGACY : VITE_URL_API, location.href)

/**
 * F-OH 的 API 地址，原始的链接
 */
export const URL_API_LEGACY = getCompletePath(VITE_URL_API_LEGACY, location.href)

/**
 * F-OH 服务器的 GOGS API
 */
export const URL_API_GOGS = VITE_URL_API_GOGS

/**
 * 首页配置 API
 */
export const URL_API_HOME = getServerCompletePath('/homePageData.json', URL_API)

/**
 * 所有应用 API
 */
export const URL_API_ALL_APP_LIST = getServerCompletePath('/allAppList.json', URL_API)

/**
 * 应用上传
 */
export const URL_UPLOAD = VITE_URL_UPLOAD
