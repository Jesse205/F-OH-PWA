import { isClientApp } from './global'

/**
 * 判断在传统 APP 中 HTML 元素是否可拖动，用于拦截拖动事件
 *
 * 如需允许拖动，请在组件上使用 `data-allow-drag` 属性
 * @returns
 * - `true` 可拖动
 * - `false` 不可拖动
 * - `undefined` 不是传统 APP
 */
export function isElementDraggableInClientApp(target: EventTarget): boolean | undefined {
  if (!isClientApp) return undefined
  for (
    let element: object = target;
    'parentElement' in element && element.parentElement;
    element = element.parentElement
  ) {
    if (
      'dataset' in element &&
      typeof element.dataset === 'object' &&
      element.dataset !== null &&
      'allowDrag' in element.dataset
    ) {
      console.log('Allow drag by data-allow-drag.')
      return true
    }
    if (
      'tagName' in element &&
      element.tagName === 'A' &&
      'href' in element &&
      typeof element.href === 'string' &&
      new URL(element.href, location.href).hostname !== location.hostname
    ) {
      console.log('Allow drag by external link.')
      return true
    }
  }
  return false
}
