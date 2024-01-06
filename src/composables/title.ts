import { useAppStore } from '@/store/app'
import type { MaybeRef, Ref } from 'vue'
import { onActivated, onDeactivated, ref, toRef, watchEffect } from 'vue'

/**
 * 当组件挂载时，自动设置标题为 `title`。
 *
 * 注意：当组件停用时，该方法不会还原原先的标题！
 * @param activated 当前激活状态，默认为 `ref(true)`
 */
export function useTitle(title: MaybeRef<string | null>, activated: Ref<boolean> = ref(true)): Ref<string | null> {
  const wrappedTitle: Ref<string | null> = toRef(title)
  const appStore = useAppStore()
  onActivated(() => {
    activated.value = true
  })
  onDeactivated(() => {
    activated.value = false
  })

  watchEffect(() => {
    if (activated.value) {
      appStore.title = wrappedTitle.value
    }
  })
  return wrappedTitle
}
