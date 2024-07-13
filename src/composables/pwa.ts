import type { DisplayModeType } from '@/utils/pwa'
import { useMediaQuery } from '@vueuse/core'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

/**
 * 获取显示模式，常用于判断是否处于PWA模式
 */
export function useDisplayMode(): ComputedRef<DisplayModeType> {
  const isFullscreen = useMediaQuery('(display-mode: fullscreen)')
  const isStandalone = useMediaQuery('(display-mode: standalone)')
  const isMinimalUi = useMediaQuery('(display-mode: minimal-ui)')
  const isWindowControlsOverlay = useMediaQuery('(display-mode: window-controls-overlay)')
  return computed((): DisplayModeType => {
    if (isFullscreen.value) return 'fullscreen'
    if (isStandalone.value) return 'standalone'
    if (isMinimalUi.value) return 'minimal-ui'
    if (isWindowControlsOverlay.value) return 'window-controls-overlay'
    return 'browser'
  })
}
