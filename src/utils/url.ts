import { URL_API_CLIENT, URL_API_CLIENT_ORIGIN, URL_API_WEB, URL_API_WEB_ORIGIN } from '@/constants/urls'
import { isClientApp, isTauriApp } from './global'

const REGEX_GITHUB_USER = /^https:\/\/(www\.)?github\.com\/[^/]+/
const REGEX_GITEE_USER = /^https:\/\/(www\.)?gitee\.com\/[^/]+/
/**
 * 获取绝对路径，如果 `keepBasePath` 为 `true` 时，无论 `url` 是否以 `/` 开头，都会保留 `base` 的路径。
 */
export function completeUrl(url: string, base: string = location.href, keepBasePath: boolean = false): string {
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

export function completeApiUrl(url: string, base: string = currentApiUrl): string {
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

function getOverrideApiUrl(): string | undefined {
  const params = new URLSearchParams(location.search)
  const apiUrl = params.get('apiUrl')
  return apiUrl ? completeUrl(apiUrl) : undefined
}

function getApiUrl(overrideApiUrl?: string, preferredApiUrl?: string, useOriginUrl: boolean = false) {
  let rawUrl: string
  if (overrideApiUrl) {
    rawUrl = overrideApiUrl
  } else if (preferredApiUrl) {
    rawUrl = preferredApiUrl
  } else if (useOriginUrl) {
    rawUrl = isClientApp ? URL_API_WEB_ORIGIN : URL_API_CLIENT_ORIGIN
  } else {
    rawUrl = isClientApp ? URL_API_WEB : URL_API_CLIENT
  }
  return completeUrl(rawUrl, location.href)
}

export const overrideApiUrl: string | undefined = getOverrideApiUrl()
export const preferredApiUrl = undefined

export const currentApiUrl: string = getApiUrl(overrideApiUrl, preferredApiUrl)
export const currentOriginApiUrl: string = getApiUrl(overrideApiUrl, preferredApiUrl, true)

function isUnsafeUrl(url: string) {
  const urlObj = new URL(url)
  return urlObj.protocol === 'http:'
}

export function isBypassUnsafeUrlByChromeFlagsNeeded(apiUrl: string): boolean {
  if (isTauriApp) {
    return false
  }
  if (location.protocol === 'https:' && isSecureContext) {
    return isUnsafeUrl(apiUrl)
  }
  return false
}
