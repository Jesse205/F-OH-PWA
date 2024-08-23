/**
 * plugins/vuetify.ts
 *
 * @see https://vuetifyjs.com
 */

import { currentDesignConfig } from '@/themes'
import { createVuetify } from 'vuetify'
import { VList } from 'vuetify/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: currentDesignConfig.blueprint,
  display: {
    mobileBreakpoint: 'lg',
  },
  aliases: {
    AppCategoryList: VList,
    DialogContentList: VList,
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
    VMain: {
      scrollable: true,
    },
  },
})
