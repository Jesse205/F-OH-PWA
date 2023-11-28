/**
 * 获取绝对 url，效果同 `new URL(url, base).href` 。
 *
 * 如果是服务器链接，请使用 {@linkcode getServerCompletePath} 。
 */
export function getCompletePath(url: string, base: string) {
  return new URL(url, base).href
}

/**
 * 服务器的相对路径为绝对路径。
 *
 * 服务器的的根路径不是域名打头，因此不能使用 `new URL(url, base).href` 。
 *
 * 如果是绝对路径，该函数会直接返回 `url` 本身。
 *
 * @param url 相对路径的链接，可以带后缀 `/`
 * @param root 根路径，可以带前缀 `/`
 */
export function getServerCompletePath(url: string, root: string) {
  if (url.search('://') > -1) return url
  return `${root}${root.endsWith('/') ? '' : '/'}${url.startsWith('/') ? url.slice(1) : url}`
}
