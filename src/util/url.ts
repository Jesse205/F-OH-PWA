/*export function getCompletePath(url: string, base?: string) {
  return new URL(url, base).href
}*/

/**
 * 服务器的相对路径为绝对路径，因此不能使用new URL(url, base).href
 * @param url
 * @param base
 * @returns
 */
export function getCompletePath(url: string, base: string) {
  if (url.search('://') > -1)
    return url
  return `${base}/${url}`
}
