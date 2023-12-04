import type { AppInfo } from '@/ts/interfaces/app.interfaces'

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
