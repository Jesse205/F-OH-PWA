export function calculateElementLines(el: HTMLElement) {
  let lineHeightNum = 0
  const { lineHeight } = window.getComputedStyle(el)
  lineHeightNum = parseFloat(lineHeight)
  return Math.round(el.clientHeight / lineHeightNum)
}

export function calculateElementLinesSafely(el: HTMLElement | null, defaultLines: number = 0) {
  return el ? calculateElementLines(el) : defaultLines
}

export function addToDomTokenListIfNeeded(list: DOMTokenList, token: string) {
  if (!list.contains(token)) {
    list.add(token)
  }
}
