/**
 * HarmonyOS Design
 *
 * @see https://developer.huawei.com/consumer/cn/design/
 */

import type { DesignFeatures } from '../base'
export { blueprint } from './blueprint'

export const features: DesignFeatures = {
  page: {
    transition: {
      enter: 'page-enter-transition',
      leave: 'page-leave-transition',
    },
  },
  dialog: {
    actionButtonLayout: 'side',
  },
  list: {
    divider: 'items',
  },
}
