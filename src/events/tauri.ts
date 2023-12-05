import { getCurrent } from '@tauri-apps/api/window'
import { onBeforeUnmount, ref } from 'vue'

export function useTauriSystemBar() {
  const appWindow = getCurrent()
  const isMaximized = ref(false)
  let unlistenResized: (() => void) | undefined
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
    appWindow,
    isMaximized,
  }
}
