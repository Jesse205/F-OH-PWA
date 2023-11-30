// Icons
import { mdi } from 'vuetify/iconsets/mdi'

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
    ...vuetifyMd2.defaults,
    VAutocomplete: {
      variant: 'outlined',
    },
    VBanner: {
      color: 'primary',
    },
    VBtn: {
      color: 'primary',
    },
    VCheckbox: {
      color: 'secondary',
    },
    VCombobox: {
      variant: 'filled',
    },
    VSelect: {
      variant: 'filled',
    },
    VSlider: {
      color: 'primary',
    },
    VTabs: {
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
    },
    VTextField: {
      variant: 'outlined',
      color: 'primary',
      rounded: false
    },
    VToolbar: {
      VBtn: {
        color: null,
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
      rounded: 'lg',
      variant: 'outlined'
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
      bgColor: 'transparent'
    },
    VNavigationDrawer: {
      color: 'background'
    },
    VDialog: {
      VCard: {
        color: 'surface',
        variant: 'elevated',
        border: false,
      }
    },
  },

}
