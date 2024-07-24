/**
 * plugins/vuetify.ts
 *
 * @see https://vuetifyjs.com
 */

import { blueprint as harmonyBlueprint } from '@/themes/harmony1'
import { blueprint as material2Blueprint } from '@/themes/material2'
import { getPreferredDesignLanguage } from '@/utils/settings'
import { createVuetify, type Blueprint } from 'vuetify'
import { VList } from 'vuetify/components'

let blueprint: Blueprint
switch (getPreferredDesignLanguage()) {
  case 'harmony1':
    blueprint = harmonyBlueprint
    break
  case 'material2':
    blueprint = material2Blueprint
    break
  default:
    blueprint = harmonyBlueprint
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint,
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
