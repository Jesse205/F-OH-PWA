import { watch, type Ref } from 'vue'

export function useLogDebug(TAG: string, message: string, obj: Ref<any>) {
  watch(
    obj,
    (newTitle) => {
      console.debug(TAG, message, newTitle)
    },
    { immediate: true },
  )
}
