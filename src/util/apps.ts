import type { AppInfo } from '@/ts/interfaces/app.interfaces'
import { isLegacyApp, isWebHistorySupported } from './app'
import { HOST_WEB } from '@/data/constants'

/**
 * 标签分割正则
 */
const tagSeparator = /[,，、 ]+/

/**
 * 获取应用标签列表，使用正则分割 `appInfo.tags` 并返回.
 */
export function getAppTags(appInfo: AppInfo): string[] {
  const tags = appInfo.tags.trim()
  return tags.length > 0 ? tags.split(tagSeparator) : []
}

export function getAppShareUrl(packageName: string): URL {
  const url = new URL(location.href)
  if (isLegacyApp) {
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
