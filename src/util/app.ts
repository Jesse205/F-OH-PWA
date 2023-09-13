import { WebviewWindow, WindowOptions } from '@tauri-apps/api/window'
import { writeText } from '@tauri-apps/api/clipboard'
import { useI18n } from 'vue-i18n'

const WEBVIEW_OPTIONS_DEFAULT: WindowOptions = {
  center: true,
  width: 960,
  height: 600,
  minWidth: 320,
  minHeight: 480
}

/**
 * 判断当前环境是否是 Tauri
 * @returns 当前环境是否是 Tauri
 */
export function isTauri(): boolean {
  return !!(window as any).__TAURI__
}

export function isPwa() {
  return ['fullscreen', 'standalone', 'minimal-ui'].some(
    displayMode => window.matchMedia(`(display-mode: ${displayMode})`).matches
  )
}

/**
 * 打开新窗口
 * @param url 要打开的链接
 */
export function openNewWindow(url: string) {
  if (isTauri()) {
    const webview = new WebviewWindow(`window-${Date.now()}`, {
      ...WEBVIEW_OPTIONS_DEFAULT,
      url
    })
  }
}

export type CopyTextState = 'success' | 'not_support' | 'unknown_error'

export function copyText(text: string, callback: (state: CopyTextState) => void) {
  if (isTauri()) {
    writeText(text).then(() => callback('success'))
  } else {
    callback('not_support')
  }
}
