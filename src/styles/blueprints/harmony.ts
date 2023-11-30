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
          surface: '#FFFFFF',
          error: '#E84026',
        },
        variables: {
          'activated-opacity': 0.1,
          'pressed-opacity': 0.1,
        },
      },
      dark: {
        colors: {
          primary: '#317AF7',
          secondary: '#317AF7',
          background: '#000000',
        },
        variables: {
          'activated-opacity': 0.15,
          'pressed-opacity': 0.15,
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
      density: 'compact',
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
      },
      color: 'background',
    },
    VBottomNavigation: {
      bgColor: 'background',
      VBtn: {
        variant: 'plain',
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
      class: ['pa-1', 'prependIconNoOpacityItem'],
    },
    VListItem: {
      rounded: true,
    },
    VNavigationDrawer: {
      color: 'background',
      VList: {
        bgColor: 'background',
      },
    },
    VDialog: {
      VCard: {
        color: 'surface',
        variant: 'elevated',
      },
      VBtn: {
        size: 'large',
      },
    },
    VOverlay: {
      scrim: 'argb(0, 0, 0, 0.3)',
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
