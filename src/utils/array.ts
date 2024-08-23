/**
 * 通过 `array.slice(0, array.length)` 清空数组，不兼容 Vue 响应式！！！
 * @param array
 */
export function clearArray<T>(array: T[]): void {
  array.splice(0, array.length)
}

export function useArrayLazyClear<T>(array: T[]) {
  function newData() {
    let clearedPreviousApps = false
    function push(...items: T[]) {
      if (!clearedPreviousApps) {
        clearArray(array)
        clearedPreviousApps = true
      }
      array.push(...items)
    }
    function finish() {
      if (!clearedPreviousApps) {
        clearArray(array)
        clearedPreviousApps = true
      }
    }
    return { push, finish }
  }
  return { newData }
}

export function removeElementFromArray<T>(array: T[], element: T) {
  const index = array.indexOf(element)
  if (index !== -1) {
    array.splice(index, 1)
  }
}
