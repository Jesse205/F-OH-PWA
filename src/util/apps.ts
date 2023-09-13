import { AppInfo } from '@/ts/interfaces/app.interfaces'

/**
 * 标签分割正则
 */
const tagSeparator = /[, ，、]+/

export function getAppTags(appInfo: AppInfo): string[] {
  return appInfo.tags.split(tagSeparator)
}
