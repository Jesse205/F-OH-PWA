import { invoke as tauriInvoke } from '@tauri-apps/api/core'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import type { WindowOptions } from '@tauri-apps/api/window'
import { getCurrent as getCurrentTauri } from '@tauri-apps/api/webview'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { getName } from '@tauri-apps/api/app'

const TAG = '[AppUtil]'
const SUFFIX_NETLIFY = '.netlify.app'

/**
 * 当前环境是否是 Tauri，开发时使用动态判断，发行时使用常量。
 */
export const isTauri = import.meta.env.DEV ? Boolean((window as any).__TAURI_INTERNALS__) : false

/**
 * 是否以传统 APP 运行
 */
export const isLegacyApp = isTauri

const WEBVIEW_OPTIONS_DEFAULT: WindowOptions | undefined = isTauri
  ? {
      center: true,
      width: 960,
      height: 600,
      minWidth: 320,
      minHeight: 480,
      transparent: false,
      decorations: false,
      visible: false,
    }
  : undefined

/**
 * 判断当前域名是否采用了重定向 API，用于在用户直接访问资源时还原原链接，否则会重定向到主页。
 */
export function isRedirectApiHost(hostname = location.hostname): boolean {
  return hostname.endsWith(SUFFIX_NETLIFY)
}

/**
 * 判断当前域名是否支持 WebHistory 模式，如果支持，则将展示简洁的地址。
 */
export function isWebHistorySupported(hostname = location.hostname): boolean {
  return hostname.endsWith(SUFFIX_NETLIFY)
}

/**
 * 打开新窗口，仅支持 tauri。
 * @param url 要打开的链接
 */
export async function openNewWindow(url: string) {
  if (isTauri) {
    const tauriWindow = new WebviewWindow(`window-${Date.now()}`, {
      title: await getName(),
      ...WEBVIEW_OPTIONS_DEFAULT,
      url,
    })
    await tauriWindow.once('tauri://created', () => {
      tauriInvoke('set_shadow', { label: tauriWindow.label }).then(() => tauriWindow.show())
    })
  } else {
    console.warn(TAG, '不支持创建新窗口')
  }
}

export type CopyTextState = 'success' | 'not_support' | 'unknown_error'

export async function copyText(text: string): Promise<CopyTextState> {
  if (isTauri) {
    await writeText(text)
    return 'success'
  } else {
    // TODO: 使用原生 API
    console.warn('不支持复制文本')
    return 'not_support'
  }
}

export function closeWindow() {
  if (isTauri) {
    getCurrentTauri().close()
  } else window.close()
}

/**
 * 断言并阻止代码运行
 */
export function assert(value: boolean, ...messages: string[]) {
  if (!value) {
    throw new Error(messages.join('\n'))
  }
}
