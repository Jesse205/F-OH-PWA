/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { harmony } from '@/styles/blueprints'

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
