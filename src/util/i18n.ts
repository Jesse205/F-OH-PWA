const PREFIX_I18N_TEXT = '$t.'
export function parseI18n(originText: string, t: (text: string) => string) {
  if (originText.startsWith(PREFIX_I18N_TEXT)) {
    return t(originText.substring(PREFIX_I18N_TEXT.length))
  } else {
    return originText
  }
}
