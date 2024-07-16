import type { TranslateOptions } from 'vue-i18n'

const PREFIX_I18N_TEXT = '$t.'
const LENGTH_PREFIX_I18N_TEXT = PREFIX_I18N_TEXT.length

export type TranslateParameters =
  | [key: string]
  | [key: string, plural: number]
  | [key: string, plural: number, options: TranslateOptions]
  | [key: string, defaultMsg: string]
  | [key: string, defaultMsg: string, options: TranslateOptions]

/**
 * 解析 i18n 文本，这通常是用在 vue 单文件组件的 `template` 的循环中
 * @param originContent 参数列表或者key，其中key带有前缀 `$t.` 则表示从 i18n 获取文本
 * @param t
 * @returns
 */
export function parseI18n(originContent: TranslateParameters | string, t: (...values: unknown[]) => string): string {
  const translateParams: TranslateParameters = typeof originContent === 'string' ? [originContent] : originContent

  if (typeof translateParams[0] === 'string' && translateParams[0].startsWith(PREFIX_I18N_TEXT)) {
    translateParams[0] = translateParams[0].substring(LENGTH_PREFIX_I18N_TEXT)
    return t(...translateParams)
  } else {
    return translateParams[0]
  }
}
