/**
 * plugins/vuetify.ts
 *
 * 框架文档: https://vuetifyjs.com
 */

import { harmony } from '@/styles/blueprints'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: harmony,
  display: {
    mobileBreakpoint: 'md',
  },
  defaults: {
    VList: {
      VListSubheader: {
        tag: 'h2',
      },
    },
  },
})
