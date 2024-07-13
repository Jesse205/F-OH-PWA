import { HOST_WEB } from '@/constants/urls'
import { isClientApp, isWebHistorySupported } from './app'

/**
 * 标签分割正则
 */
const REGEX_SEPARATOR_TAG = /[,，、 ]+/

export interface AppInfo {
  id: number
  name: string
  desc: string
  icon: string
  vender: string
  packageName: string
  version: string
  hapUrl: string
  type: AppType
  tags: string
  openSourceAddress: string
  releaseTime: string
}

export type AppType = 'app' | 'game' | string

/**
 * 获取应用标签列表，使用正则分割 `appInfo.tags` 并返回.
 */
export function getAppTags(appInfo: AppInfo): string[] {
  const tags = appInfo.tags.trim()
  return tags.length > 0 ? tags.split(REGEX_SEPARATOR_TAG) : []
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
