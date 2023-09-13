import { getServerCompletePath } from '@/util/url';

//Urls
const { VITE_URL_API, VITE_URL_UPLOAD } = import.meta.env

/**
 * API 链接
 */
export const URL_API = getServerCompletePath(VITE_URL_API, location.href)

/**
 * 首页配置
 */
export const URL_HOME = `${VITE_URL_API}/homePageData.json`

/**
 * 所有应用
 */
export const URL_ALL_APP_LIST = `${VITE_URL_API}/allAppList.json`

/**
 * 应用上传
 */
export const URL_UPLOAD = VITE_URL_UPLOAD
