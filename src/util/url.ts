export function getCompletePath(url: string, base?: string) {
  return new URL(url, base).href
}
