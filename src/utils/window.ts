import { getCurrent as getCurrentTauri } from '@tauri-apps/api/webview'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import type { WindowOptions } from '@tauri-apps/api/window'
import { isTauriApp } from './app'

const TAG = '[WindowUtil]'

const TAURI_WINDOW_OPTIONS_DEFAULT: WindowOptions | undefined = isTauriApp
  ? {
      center: true,
      width: 960,
      height: 600,
      minWidth: 320,
      minHeight: 480,
      transparent: false,
      decorations: false,
      visible: false,
      shadow: true,
    }
  : undefined

/**
 * 打开新窗口，仅支持 tauri。
 * @param url 要打开的链接
 */
export async function openNewWindow(url: string) {
  if (isTauriApp) {
    const tauriWindow = new WebviewWindow(`window-${Date.now()}`, {
      // title: await getName(),
      ...TAURI_WINDOW_OPTIONS_DEFAULT,
      url,
    })
    await tauriWindow.once('tauri://created', () => {
      tauriWindow.show()
    })
  } else {
    console.warn(TAG, '不支持创建新窗口')
  }
}

export function closeWindow() {
  if (isTauriApp) {
    getCurrentTauri().close()
  } else window.close()
}
