const PREFIX_I18N_TEXT = '$t.'
const LENGTH_PREFIX_I18N_TEXT = PREFIX_I18N_TEXT.length

/**
 * 解析 i18n 文本，这通常是用在 vue 单文件组件的 `template` 的循环中
 * @param originText 原始文本，带有前缀 `$t.` 则表示从 i18n 获取文本
 * @param t
 * @returns
 */
export function parseI18n(originContent: string | [string, ...any], t: (text: string, ...values: any) => string) {
  let originText: string = ''
  let originValues: any[] = []
  if (typeof originContent === 'string') {
    originText = originContent
  } else {
    originText = originContent[0]
    originValues = originContent.slice(1, -1)
  }

  if (originText.startsWith(PREFIX_I18N_TEXT)) {
    return t(originText.substring(LENGTH_PREFIX_I18N_TEXT), ...originValues)
  } else {
    return originText
  }
}
