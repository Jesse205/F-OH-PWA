import type { MaybeRef, Ref } from 'vue'
import { inject, onActivated, onDeactivated, ref, toRef, watchEffect, computed } from 'vue'
import { useGlobalDisplayMode } from './pwa'
import { isPwaDisplayMode } from '@/util/pwa'

export function useTitle(title: MaybeRef<string | null>, actived: Ref<boolean> = ref(true)) {
  const wrappedTitle = toRef(title)
  onActivated(() => {
    actived.value = true
  })
  onDeactivated(() => {
    actived.value = false
  })
  const appName = useGlobalAppName()
  const clearTitleMode = useClearTitleMode()
  watchEffect(() => {
    if (actived.value) {
      if (wrappedTitle.value && !clearTitleMode.value) document.title = `${wrappedTitle.value} - ${appName.value}`
      else if (wrappedTitle.value && clearTitleMode.value) document.title = wrappedTitle.value ?? ''
      else document.title = appName.value
    }
  })
}

/**
 * 获取在 `App.vue` 中提供的应用名。
 */
export function useGlobalAppName() {
  return inject<Ref<string>>('appName')!
}

/**
 * 获取是否使用纯净的标题，剔除应用名。
 *
 * 在 Chromium 系列浏览器，Windows 系统，且为 PWA 模式下才生效。
 */
function useClearTitleMode() {
  const displayMode = useGlobalDisplayMode()
  const { userAgent } = navigator
  return computed(() => {
    return !!(userAgent.includes('Chrome') && userAgent.includes('Windows') && isPwaDisplayMode(displayMode.value))
  })
}
