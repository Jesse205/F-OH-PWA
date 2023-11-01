import { DisplayModeType } from '@/util/pwa'
import { useMediaQuery } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref, provide, computed, inject, Ref } from 'vue'

interface BeforeInstallPrompt extends Event {
  prompt: () => void
  userChoice: Promise<any>
}

/**
 * 这个只能在 APP 组件使用，否则 `onBeforeInstallPrompt` 不会执行
 *
 * 该方法提供 `installBtnVisible` 和 `onInstallBtnClick`，可以在其他组件内直接通过 `inject` 动态显示安装按钮与绑定按钮事件。
 * @see inject
 */
export function usePwa() {
  const installBtnVisible = ref(false)
  let deferredPrompt: BeforeInstallPrompt | null = null
  function onInstallBtnClick() {
    if (!deferredPrompt) return
    installBtnVisible.value = false
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
        installBtnVisible.value = false
      } else {
        console.log('User dismissed the A2HS prompt')
        installBtnVisible.value = true
      }
    })
  }
  provide('installBtnVisible', installBtnVisible)
  provide('onInstallBtnClick', onInstallBtnClick)

  function onBeforeInstallPrompt(prompt: BeforeInstallPrompt) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    prompt.preventDefault()
    installBtnVisible.value = true
    deferredPrompt = prompt
  }

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt as EventListener)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt as EventListener)
  })
}

/**
 * 获取显示模式值。
 */
export function useDisplayMode() {
  const isFullscreen = useMediaQuery('(display-mode: fullscreen)')
  const isStandalone = useMediaQuery('(display-mode: standalone)')
  const isMinimalUi = useMediaQuery('(display-mode: minimal-ui)')
  const isWindowControlsOverlay = useMediaQuery('(display-mode: window-controls-overlay)')
  return computed<DisplayModeType>(() => {
    if (isFullscreen.value) return 'fullscreen'
    if (isStandalone.value) return 'standalone'
    if (isMinimalUi.value) return 'minimal-ui'
    if (isWindowControlsOverlay.value) return 'window-controls-overlay'
    return 'browser'
  })
}

/**
 * 获取从 `App.vue` 中提供的显示模式值。
 */
export function useGlobalDisplayMode() {
  return inject<Ref<DisplayModeType>>('displayMode')!!
}
