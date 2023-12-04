// Icons
import { hmi, aliases } from '@/iconsets/hmi'
import { mdi } from 'vuetify/iconsets/mdi'

// Types
import type { Blueprint } from 'vuetify'

import { md2 as vuetifyMd2 } from 'vuetify/blueprints'

export const harmony: Blueprint = {
  ...vuetifyMd2,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#0A59F7',
          secondary: '#0A59F7',
          background: '#F1F3F5',
          surface: '#ffffff',
          'surface-variant': '#E5E5E5',
          'on-surface-variant': '#000000',
          error: '#E84026',
          info: '#0A59F7',
        },
        variables: {
          'activated-opacity': 0.1,
          'pressed-opacity': 0.1,
          'border-opacity': 0.2,
        },
      },
      dark: {
        colors: {
          primary: '#317AF7',
          secondary: '#317AF7',
          background: '#000000',
          'surface-variant': '#424242',
          'on-surface-variant': '#ffffff',
          error: '#E84026',
          info: '#317AF7',
        },
        variables: {
          'activated-opacity': 0.15,
          'pressed-opacity': 0.15,
          'border-opacity': 0.2,
        },
      },
    },
  },
  defaults: {
    ...vuetifyMd2.defaults,
    global: {
      ripple: false,
      rounded: 'md',
    },
    VAppBar: {
      flat: true,
      density: 'comfortable',
    },
    VAutocomplete: {
      variant: 'outlined',
    },
    VBanner: {
      color: 'primary',
    },
    VBtn: {
      color: 'primary',
      rounded: 'pill',
    },
    VCheckbox: {
      color: 'secondary',
    },
    VCombobox: {
      variant: 'underlined',
    },
    VSelect: {
      variant: 'underlined',
    },
    VSlider: {
      color: 'primary',
    },
    VTabs: {
      color: 'primary',
    },
    VTextarea: {
      variant: 'underlined',
    },
    VTextField: {
      variant: 'underlined',
      // color: 'primary',
      rounded: false,
    },
    VToolbar: {
      VBtn: {
        color: null,
        rounded: 'lg',
      },
      color: 'background',
    },
    VBottomNavigation: {
      bgColor: 'background',
      VBtn: {
        // variant: 'plain',
        rounded: 'lg',
        ripple: false,
      },
      grow: true,
      color: 'primary',
      elevation: 0,
    },
    VMenu: {
      minWidth: 172,
      transition: 'slide-y-transition',
      VList: {
        // bgColor: 'surface'
        color: 'primary',
      },
    },
    VCheckboxBtn: {
      color: 'primary',
    },
    VCard: {
      flat: true,
    },
    VTooltip: {
      transition: 'fade-transition',
    },
    VListSubheader: {
      color: 'primary',
    },
    VList: {
      rounded: true,
      class: ['pa-1'],
    },
    VListItem: {
      rounded: true,
      VAvatar: {
        size: '24',
      },
    },
    VNavigationDrawer: {
      color: 'background',
      VList: {
        bgColor: 'background',
      },
      VListItem: {
        VAvatar: {
          size: 'default',
        },
      },
    },
    VDialog: {
      transition: 'dialog-transition',
      VCard: {
        color: 'surface',
        variant: 'elevated',
      },
      VBtn: {
        size: 'large',
      },
    },
    VProgressCircular: {
      width: 3,
      size: '40',
    },
    VAlert: {
      variant: 'tonal',
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      hmi,
      mdi,
    },
  },
}
