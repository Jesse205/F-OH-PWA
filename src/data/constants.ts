import { getCompletePath, getServerCompletePath } from '@/util/url'
import { isLegacyApp } from '@/util/app'

//Urls
const { VITE_URL_API, VITE_URL_API_LEGACY_APP, VITE_URL_UPLOAD } = import.meta.env

/**
 * API 链接
 */
export const URL_API = getCompletePath(isLegacyApp() ? VITE_URL_API_LEGACY_APP : VITE_URL_API, location.href)

/**
 * 首页配置
 */
export const URL_HOME = getServerCompletePath('/homePageData.json', URL_API)

/**
 * 所有应用
 */
export const URL_ALL_APP_LIST = getServerCompletePath('/allAppList.json', URL_API)

/**
 * 应用上传
 */
export const URL_UPLOAD = VITE_URL_UPLOAD
