// Icons
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
          error: '#E84026'
        }
      },
      dark: {
        colors: {
          primary: '#317AF7',
          secondary: '#317AF7',
          background: '#000000'
        }
      }
    }
  },
  defaults: {
    ...vuetifyMd2.defaults,
    VAppBar: {
      flat: true
    },
    VAutocomplete: {
      variant: 'outlined'
    },
    VBanner: {
      color: 'primary'
    },
    VBtn: {
      color: 'primary',
      rounded: 'pill'
    },
    VCheckbox: {
      color: 'secondary'
    },
    VCombobox: {
      variant: 'underlined'
    },
    VSelect: {
      variant: 'underlined'
    },
    VSlider: {
      color: 'primary'
    },
    VTabs: {
      color: 'primary'
    },
    VTextarea: {
      variant: 'underlined'
    },
    VTextField: {
      variant: 'underlined',
      // color: 'primary',
      rounded: false
    },
    VToolbar: {
      VBtn: {
        color: null
      },
      color: 'background'
    },
    VBottomNavigation: {
      bgColor: 'background',
      VBtn: {
        variant: 'plain'
      }
    },
    VMenu: {
      minWidth: 172,
      transition: 'slide-y-transition',
      VList: {
        bgColor: 'surface'
      }
    },
    VCheckboxBtn: {
      color: 'primary'
    },
    VCard: {
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
    VList: {
      bgColor: 'surface',
      class: ['pa-1']
    },
    VListItem: {},
    VNavigationDrawer: {
      color: 'background'
    },
    VDialog: {
      VCard: {
        color: 'surface',
        variant: 'elevated'
      }
    },
    VOverlay: {
      scrim: 'argb(0, 0, 0, 0.3)'
    }
  }
}
