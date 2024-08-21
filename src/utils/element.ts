import { computed, type ComputedRef, type Ref } from 'vue'
import type { VMain } from 'vuetify/components'

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

export function useVMainScroller(vMain: Ref<InstanceType<typeof VMain> | undefined>): ComputedRef<HTMLDivElement> {
  return computed(() => vMain.value?.$el?.querySelector('.v-main__scroller'))
}
