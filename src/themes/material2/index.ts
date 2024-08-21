/**
 * Material Design 2
 */

import type { DesignFeatures } from '../base'
export { blueprint } from './blueprint'

export const features: DesignFeatures = {
  pageTransition: {
    enter: 'scroll-x-reverse-transition',
    leave: 'scroll-x-transition',
  },
  dialog: {
    actionsBarMode: 'end',
  },
}
