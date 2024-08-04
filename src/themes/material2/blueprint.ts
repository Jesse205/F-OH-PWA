import type { Blueprint } from 'vuetify'
import { aliases, mdi } from './iconset'

export const blueprint: Blueprint = {
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1E88E5',
          secondary: '#43A047',
          surface: '#FFFFFF',
        },
      },
      dark: {
        colors: {
          primary: '#42A5F5',
          secondary: '#66BB6A',
        },
      },
    },
  },
  defaults: {
    global: {
      rounded: 'md',
    },
    VAvatar: {
      rounded: 'circle',
    },
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
      color: 'primary',
      rounded: false,
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VToolbar: {
      color: 'background',
      VBtn: {
        color: null,
      },
    },
    VAppBar: {
      flat: true,
      // border: 'b',
      density: 'comfortable',
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
    VList: {
      bgColor: 'transparent',
      lines: false,
      border: true,
      rounded: 'lg',
    },
    VNavigationDrawer: {
      color: 'background',
      VList: {
        color: 'primary',
        border: false,
        rounded: false,
        VListItem: {
          rounded: true,
        },
      },
    },
    VDialog: {
      width: '560',
      transition: 'dialog-transition',
      VCard: {
        color: 'surface',
        variant: 'elevated',
        border: false,
      },
    },
    VSwitch: {
      color: 'primary',
      hideDetails: 'auto',
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
}
