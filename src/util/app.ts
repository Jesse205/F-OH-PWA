import type { WindowOptions } from '@tauri-apps/api/window'
import { WebviewWindow } from '@tauri-apps/api/window'
import { writeText } from '@tauri-apps/api/clipboard'
import { getName } from '@tauri-apps/api/app'

const WEBVIEW_OPTIONS_DEFAULT: WindowOptions = {
  center: true,
  width: 960,
  height: 600,
  minWidth: 320,
  minHeight: 480,
}

/**
 * 判断当前环境是否是 Tauri
 */
export const isTauri = !!(window as any).__TAURI__

/**
 * 判断是否以传统 APP 运行
 */
export function isLegacyApp(): boolean {
  return isTauri
}

/**
 * 判断当前域名是否采用了重定向 API，用于在用户直接访问资源时还原原链接。
 */
export function isRedirectApiHost(): boolean {
  return location.hostname.endsWith('.netlify.app')
}

/**
 * 打开新窗口
 * @param url 要打开的链接
 */
export async function openNewWindow(url: string) {
  if (isTauri) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const window = new WebviewWindow(`window-${Date.now()}`, {
      title: await getName(),
      ...WEBVIEW_OPTIONS_DEFAULT,
      url,
    })
  } else {
    console.warn('不支持创建新窗口')
  }
}

export type CopyTextState = 'success' | 'not_support' | 'unknown_error'

export function copyText(text: string, callback: (state: CopyTextState) => void) {
  if (isTauri) {
    writeText(text).then(() => callback('success'))
  } else {
    // TODO: 使用原生 API
    console.warn('不支持复制文本')
    callback('not_support')
  }
}

/* export function closeWindow() {
  if (isTauri()) {
    getCurrent().close()
  } else window.close()
}
*/
