import { HOST_WEB } from '@/constants/urls'
import type { AppInfo } from '@/data/apps'
import { isClientApp, isWebHistorySupported } from './global'

const REGEX_SPLIT_TAGS = /[,，]/

/**
 * 获取应用标签列表，使用正则分割 `appInfo.tags` 并返回.
 */
export function splitAppTags(tags: string): readonly string[] {
  const trimmedTags = tags.trim()
  if (trimmedTags.length > 0) {
    return Object.freeze(trimmedTags.split(REGEX_SPLIT_TAGS).map((tag) => tag.trim()))
  }
  return Object.freeze([])
}

export function getAppShareUrl(packageName: string): URL {
  const url = new URL(location.href)
  if (isClientApp) {
    url.hostname = HOST_WEB
    url.protocol = 'https'
    url.port = ''
  }
  url.pathname = ''
  url.hash = ''
  if (isWebHistorySupported(url.hostname)) {
    url.pathname = `/app/${packageName}`
  } else {
    url.hash = `#/app/${packageName}`
  }
  return url
}

export function isLocalAppsOutdated(apps: readonly AppInfo[]): boolean {
  return apps.length === 0
}
