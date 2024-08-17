export function calculateElementLines(el: HTMLElement): number {
  let lineHeightNum = 0
  const { lineHeight } = window.getComputedStyle(el)
  lineHeightNum = parseFloat(lineHeight)
  return Math.round(el.clientHeight / lineHeightNum)
}

export function calculateElementLinesSafely(el: HTMLElement | null, defaultLines: number = 0): number {
  return el ? calculateElementLines(el) : defaultLines
}

export function addToDomTokenListIfNeeded(list: DOMTokenList, token: string): void {
  if (!list.contains(token)) {
    list.add(token)
  }
}
