/**
 * HarmonyOS Design
 *
 * @see https://developer.huawei.com/consumer/cn/design/
 */

import type { DesignFeatures } from '../base'
export { blueprint } from './blueprint'

export const features: DesignFeatures = {
  pageTransition: {
    enter: 'page-enter-animation',
    leave: 'page-leave-animation',
  },
  dialog: {
    actionsBarMode: 'fill',
  },
}
