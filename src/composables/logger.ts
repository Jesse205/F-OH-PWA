import { watch, type Ref } from 'vue'

export function useLogDebug<T>(TAG: string, message: string, obj: Ref<T>) {
  watch(
    obj,
    (newTitle) => {
      console.debug(TAG, message, newTitle)
    },
    { immediate: true },
  )
}
