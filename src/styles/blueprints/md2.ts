// Types
import type { Blueprint } from 'vuetify'

import { md2 as vuetifyMd2 } from 'vuetify/blueprints'

export const md2: Blueprint = {
  ...vuetifyMd2,

  theme: {
    themes: {
      light: {
        colors: {
          primary: '#007DFF',
          secondary: '#81bd0a',
          surface: '#FFFFFF',
          error: '#B00020',
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
}
