import { addToDomTokenListIfNeeded, calculateElementLinesSafely } from '@/utils/element'
import type { Directive } from 'vue'

const CLASS_AUTO_HEIGHT = 'v-list-item--auto-height'
const CLASS_AUTO_HEIGHT_ONE_LINES = 'v-list-item--auto-height--one-lines'
const CLASS_AUTO_HEIGHT_TWO_LINES = 'v-list-item--auto-height--two-lines'
const CLASS_AUTO_HEIGHT_THREE_LINES = 'v-list-item--auto-height--three-lines'

export const vListItemAutoHeight: Directive<HTMLElement, unknown> = function (el) {
  const { classList } = el

  addToDomTokenListIfNeeded(classList, CLASS_AUTO_HEIGHT)
  const titleElement = el.querySelector<HTMLElement>('.v-list-item-title')
  const subtitleElement = el.querySelector<HTMLElement>('.v-list-item-subtitle')
  const lines = calculateElementLinesSafely(titleElement) + calculateElementLinesSafely(subtitleElement)
  let linesClassName = ''
  switch (lines) {
    case 0:
      break
    case 1:
      linesClassName = CLASS_AUTO_HEIGHT_ONE_LINES
      break
    case 2:
      linesClassName = CLASS_AUTO_HEIGHT_TWO_LINES
      break
    default:
      linesClassName = CLASS_AUTO_HEIGHT_THREE_LINES
      break
  }
  if (!classList.contains(linesClassName)) {
    classList.remove(CLASS_AUTO_HEIGHT_ONE_LINES, CLASS_AUTO_HEIGHT_TWO_LINES, CLASS_AUTO_HEIGHT_THREE_LINES)
    classList.add(linesClassName)
  }
}
