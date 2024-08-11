/**
 * plugins/vuetify.ts
 *
 * @see https://vuetifyjs.com
 */

import { currentBlueprint } from '@/themes'
import { createVuetify } from 'vuetify'
import { VList } from 'vuetify/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: currentBlueprint,
  display: {
    mobileBreakpoint: 'lg',
  },
  aliases: {
    AppCategoryList: VList,
  },
  defaults: {
    VList: {
      tag: 'ul',
      VListSubheader: {
        tag: 'h2',
      },
      VListItem: {
        tag: 'li',
      },
    },

    VMenu: {
      scrim: 'transparent',
    },
  },
})
