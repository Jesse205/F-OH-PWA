import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { isTauriApp } from './app'

const TAG = '[ClipboardUtil]'

export type CopyTextState = 'success' | 'not_support' | 'unknown_error'

export async function copyText(text: string): Promise<CopyTextState> {
  if (isTauriApp) {
    await writeText(text)
    return 'success'
  } else {
    // TODO: 使用原生 API
    console.warn(TAG, '不支持复制文本')
    return 'not_support'
  }
}
