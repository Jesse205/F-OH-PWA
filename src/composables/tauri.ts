import { getCurrentWindow } from '@tauri-apps/api/window'
import { onBeforeUnmount, ref } from 'vue'

export function useTauriSystemBar() {
  const appWindow = getCurrentWindow()
  const isMaximized = ref(false)
  let unlistenResized: (() => void) | undefined
  appWindow.isMaximized().then((maximized) => {
    isMaximized.value = maximized
  })
  appWindow
    .onResized(async () => {
      isMaximized.value = await appWindow.isMaximized()
    })
    .then((unlisten) => {
      unlistenResized = unlisten
    })
  onBeforeUnmount(() => {
    if (unlistenResized) unlistenResized()
  })
  return {
    isMaximized,
    minimize: appWindow.minimize,
    maximize: appWindow.maximize,
    unmaximize: appWindow.unmaximize,
    close: appWindow.close,
  }
}
