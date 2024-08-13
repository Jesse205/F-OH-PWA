import { HOST_WEB } from '@/constants/urls'
import { isClientApp, isWebHistorySupported } from './app'

export type AppType = 'app' | 'game' | string

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

/**
 * 获取应用标签列表，使用正则分割 `appInfo.tags` 并返回.
 */
export function getAppTags(appInfo: AppInfo): string[] {
  const tags = appInfo.tags.trim()
  return tags.length > 0 ? tags.split(',').map((tag) => tag.trim()) : []
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
