import {
  URL_API_ALL_APP_RELATIVE,
  URL_API_CLIENT,
  URL_API_CLIENT_ORIGIN,
  URL_API_HOME_RELATIVE,
  URL_API_WEB,
  URL_API_WEB_ORIGIN,
} from '@/constants/urls'
import { getPreferredServerUrl } from '@/utils/settings'
import { isClientApp } from './app'

const REGEX_GITHUB_USER = /^https:\/\/(www\.)?github\.com\/[^/]+/
const REGEX_GITEE_USER = /^https:\/\/(www\.)?gitee\.com\/[^/]+/

/**
 * 获取绝对路径，如果 `keepBasePath` 为 `true` 时，无论 `url` 是否以 `/` 开头，都会保留 `base` 的路径。
 */
export function completeUrl(url: string, base: string = location.href, keepBasePath: boolean = false) {
  if (url.search('://') > -1) return url
  if (keepBasePath) {
    if (url.startsWith('/')) {
      url = url.slice(1)
    }
    if (!base.endsWith('/')) {
      base = base + '/'
    }
  }
  return new URL(url, base).href
}

export function completeServerUrl(url: string, base: string = getApiUrl()) {
  return completeUrl(url, base, true)
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
      return url.href.match(REGEX_GITHUB_USER)?.[0] ?? null
    }
    case 'www.gitee.com':
    case 'gitee.com': {
      return url.href.match(REGEX_GITEE_USER)?.[0] ?? null
    }
  }
  return null
}

/**
 * 将路径和 hash 分离
 * @param path 路径，例如 `https://host/path#hash`
 * @returns 例如 [https://host/path, hash]
 */
export function splitPathAndHash(path: string): (string | undefined)[] {
  return path.includes('#') ? path.split('#') : [path, undefined]
}

export function getApiUrl(useOriginUrl: boolean = false) {
  const preferredServerUrl = getPreferredServerUrl()
  if (preferredServerUrl) {
    return preferredServerUrl
  }
  if (useOriginUrl) {
    return isClientApp ? URL_API_WEB_ORIGIN : URL_API_CLIENT_ORIGIN
  } else {
    return isClientApp ? URL_API_WEB : URL_API_CLIENT
  }
}

// API 链接

export function getHomeApiUrl() {
  return completeServerUrl(URL_API_HOME_RELATIVE)
}

export function getAllAppsApiUrl() {
  return completeServerUrl(URL_API_ALL_APP_RELATIVE)
}
