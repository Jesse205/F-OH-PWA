
/**
 * 判断当前环境是否是 Tauri
 * @returns 当前环境是否是 Tauri
 */
export function isTauri(): boolean {
  return !!(window as any).__TAURI__
}
