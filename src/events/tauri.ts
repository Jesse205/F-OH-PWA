import { getCurrent } from '@tauri-apps/api/window'

export function useTauriSystemBar() {
  const appWindow = getCurrent()

  return {
    appWindow,
  }
}
