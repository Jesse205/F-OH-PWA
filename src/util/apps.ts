import { AppInfo } from '@/ts/interfaces/app.interfaces'

/**
 * 标签分割正则
 */
const tagSeparator = /[,，、 ]+/

export function getAppTags(appInfo: AppInfo): string[] {
  const tags = appInfo.tags.trim()
  return tags.length > 0 ? tags.split(tagSeparator) : []
}
