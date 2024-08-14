import { IS_DEV_MODE } from '@/constants'

const SUFFIX_NETLIFY = '.netlify.app'

/**
 * 当前环境是否是 Tauri，开发时使用动态判断，发行时使用常量。
 */
//TODO: 非开发模式使用环境变量判断
export const isTauriApp = IS_DEV_MODE ? '__TAURI_INTERNALS__' in window : false

/**
 * 是否以客户端方式运行
 */
export const isClientApp = isTauriApp

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
  if (IS_DEV_MODE && hostname === location.hostname) {
    return true
  }
  return hostname.endsWith(SUFFIX_NETLIFY)
}

/**
 * 断言并阻止代码运行
 */
export function assert(value: boolean, ...messages: string[]) {
  if (!value) {
    throw new Error(messages.join('\n'))
  }
}
