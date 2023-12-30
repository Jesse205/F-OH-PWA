import { URL_API, URL_API_ALL_APP_LIST_RELATIVE, URL_API_HOME_RELATIVE, URL_API_LEGACY } from '@/data/constants'
import { isRedirectApiHost } from './app'
import { KEY_SERVER } from '@/composables/settings'

const MACHER_GITHUB_USER = /^https:\/\/(www\.)?github\.com\/[^/]+/
const MACHER_GITEE_USER = /^https:\/\/(www\.)?gitee\.com\/[^/]+/

/**
 * 获取绝对 url，效果同 `new URL(url, base).href` 。
 *
 * 如果是服务器链接，请使用 {@linkcode getServerCompletePath} 。
 */
export function getCompletePath(url: string, base: string = location.href) {
  return new URL(url, base).href
}

/**
 * 服务器的相对路径为绝对路径。
 *
 * 服务器的的根路径不是域名打头，因此不能使用 `new URL(url, base).href` 或 {@linkcode getCompletePath}。
 *
 * 如果是绝对路径，该函数会直接返回 `url` 本身。
 *
 * @param url 相对路径的链接，可以带前缀 `/`
 * @param root 根路径，可以带后缀 `/`
 */
export function getServerCompletePath(
  url: string,
  root: string = getApiUrl(),
) {
  if (url.search('://') > -1) return url
  return `${root}${root.endsWith('/') ? '' : '/'}${url.startsWith('/') ? url.slice(1) : url}`
}

/**
 * 用传入的链接匹配用户空间地址
 * @param url 支持的链接：
 * - `http(s)://(www.)github.com/xxx(/xxx/...)`
 * - `http(s)://(www.)gitee.com/xxx(/xxx/...)`
 */
export function matchUserSpace(url: URL): string | null {
  switch (url.hostname) {
    case 'www.github.com':
    case 'github.com': {
      return url.href.match(MACHER_GITHUB_USER)?.[0] ?? null
    }
    case 'www.gitee.com':
    case 'gitee.com': {
      return url.href.match(MACHER_GITEE_USER)?.[0] ?? null
    }
  }
  return null
}

export function splitPathAndHash(path: string): (string | undefined)[] {
  return path.includes('#') ? path.split('#') : [path, undefined]
}

export function getUserServerSetting() {
  return localStorage.getItem(KEY_SERVER)?.trim()
}

export function getApiUrl(acceptRedirect: boolean = true) {
  const userServerApi = getUserServerSetting()
  if (userServerApi) {
    return userServerApi
  }
  if (acceptRedirect) {
    return isRedirectApiHost() ? URL_API_LEGACY : URL_API
  } else {
    return URL_API
  }
}

// API 链接

export function getHomeApiUrl() {
  return getServerCompletePath(URL_API_HOME_RELATIVE)
}

export function getAllAppsListApiUrl() {
  return getServerCompletePath(URL_API_ALL_APP_LIST_RELATIVE)
}
