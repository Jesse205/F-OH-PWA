/**
 * 通过 `array.slice(0, array.length)` 清空数组，不兼容 Vue 响应式！！！
 * @param array
 */
export function clearArray<T>(array: T[]): void {
  array.splice(0, array.length)
}
