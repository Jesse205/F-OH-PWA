import { watchImmediate } from '@vueuse/core'
import { type Ref } from 'vue'

export function useLogDebug<T>(TAG: string, message: string, obj: Ref<T>) {
  watchImmediate(obj, (newTitle) => {
    console.debug(TAG, message, newTitle)
  })
}
