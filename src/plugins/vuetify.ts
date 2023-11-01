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
import { md2 } from 'vuetify/blueprints'

import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md2,
  display: {
    mobileBreakpoint: 'md'
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#007DFF',
          secondary: '#81bd0a',
          surface: '#FFFFFF'
        }
      },
      dark: {
        colors: {
          primary: '#006CDE',
          secondary: '#81bd0a'
        }
      }
    }
  },
  defaults: {
    VBottomNavigation: {
      bgColor: 'background',
      VBtn: {
        variant: 'plain'
      }
    },
    VMenu: {
      minWidth: 196,
      VList: {
        bgColor: 'surface'
      }
    },
    VCheckboxBtn: {
      color: 'primary'
    },
    VCard: {
      border: true,
      elevation: 0,
      rounded: 'lg',
      flat: true
    },
    VTooltip: {
      transition: 'fade-transition'
    },
    VListSubheader: {
      color: 'primary'
    },
    VProgressCircular: {
      color: 'primary'
    },
    VTextField: {
      color: 'primary',
      rounded: false
    },
    VList: {
      bgColor: 'transparent'
    },
    VToolbar: {
      color: 'background'
    },
    VNavigationDrawer: {
      color: 'background'
    }
  },
  components: {
    VSkeletonLoader
  }
})
