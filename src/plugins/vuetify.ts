/**
 * plugins/vuetify.ts
 *
 * @see https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
// import { VList, VMenu } from 'vuetify/components'

import { currentDesignConfig } from '@/themes'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: currentDesignConfig.blueprint,
  display: {
    mobileBreakpoint: 'lg',
  },
  aliases: {
    /* AppCategoryList: VList,
    DialogContentList: VList,
    AppBarOverflowMenu: VMenu, */
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
  },
})
