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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md2,
  display: {
    mobileBreakpoint: 'md',
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#007DFF',
          secondary: '#81bd0a',
          surface: '#FFFFFF',
        },
      },
      dark: {
        colors: {
          primary: '#006CDE',
          secondary: '#81bd0a',
        },
      },
    },
  },
  defaults: {
    VAppBar: {
      flat: true,
      // border: 'b',
      density: 'compact',
    },
    VBottomNavigation: {
      VBtn: {
        variant: 'plain',
      },
      grow: true,
      color: 'primary',
    },
    VMenu: {
      minWidth: 196,
      VList: {
        bgColor: 'surface',
        border: false,
        rounded: false,
      },
    },
    VCheckboxBtn: {
      color: 'primary',
    },
    VCard: {
      border: true,
      rounded: 'lg',
      variant: 'outlined',
    },
    VTooltip: {
      transition: 'fade-transition',
    },
    VListSubheader: {
      color: 'primary',
    },
    VProgressCircular: {
      color: 'primary',
    },
    VTextField: {
      color: 'primary',
      rounded: false,
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VCombobox: {
      color: 'primary',
      rounded: false,
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VSelect: {
      color: 'primary',
      rounded: false,
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VList: {
      bgColor: 'transparent',
      border: true,
      rounded: 'lg',
    },
    VToolbar: {
      color: 'background',
    },
    VNavigationDrawer: {
      color: 'background',
      VList: {
        border: false,
        rounded: false,
        VListItem: {
          rounded: true,
        },
      },
    },
    VDialog: {
      VCard: {
        color: 'surface',
        variant: 'elevated',
        border: false,
      },
    },
  },
})
