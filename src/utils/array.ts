import { watchImmediate } from '@vueuse/core'
import { computed, toValue, type WatchSource } from 'vue'

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

export function useCachedArrayMap<T, U>(
  array: WatchSource<T[]> | T[],
  fn: (element: T, index: number, array: T[]) => U,
  keyGetter: (item: T) => string,
) {
  const cachedMap = new Map<string, U>()
  const cachedArray = computed(() =>
    toValue(array).map((item, index, array) => {
      const key = keyGetter(item)
      const cachedValue = cachedMap.get(key)
      if (cachedValue) {
        return cachedValue
      }
      const value = fn(item, index, array)
      cachedMap.set(key, value)
      return value
    }),
  )
  watchImmediate(array, (newArray) => {
    const newKeys = toValue(newArray).map((item) => keyGetter(item))
    const cachedKeys = [...cachedMap.keys()]
    for (const key of cachedKeys) {
      if (!newKeys.includes(key)) {
        cachedMap.delete(key)
      }
    }
  })
  function clearCache() {
    cachedMap.clear()
  }
  return { cachedArray, clearCache }
}
