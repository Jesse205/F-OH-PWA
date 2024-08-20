import type { Blueprint } from 'vuetify'
import { aliases, mdi } from './icons'

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
          'surface-bright': '#ffffff',
        },
      },
    },
  },
  defaults: {
    global: {
      rounded: 'default',
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
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VSelect: {
      color: 'primary',
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
      border: 'b',
      density: 'comfortable',
    },
    VBottomNavigation: {
      class: ['bg-background'],
      grow: true,
      color: 'primary',
      border: 't',
      elevation: 0,
    },
    VMenu: {
      minWidth: 196,
      VList: {
        elevation: '8',
        color: 'primary',
        bgColor: 'surface',
        border: false,
        activeClass: 'v-list-item--active-background',
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
    VList: {
      bgColor: 'transparent',
      lines: false,
      border: true,
      rounded: true,
    },
    AppCategoryList: {
      bgColor: 'transparent',
      lines: false,
      border: false,
      rounded: true,
      class: ['app-category-list'],
    },
    VNavigationDrawer: {
      color: 'background',
      VList: {
        color: 'primary',
        activeClass: 'v-list-item--active-background',
        border: false,
        rounded: false,
        lines: 'one',
      },
      VListItem: {
        rounded: true,
      },
    },
    VDialog: {
      width: '560',
      transition: 'dialog-transition',
      VCard: {
        elevation: '24',
        color: 'surface',
        variant: 'elevated',
        border: false,
      },
    },
    VProgressCircular: {
      color: 'primary',
      width: 4,
      size: '48',
    },
    VAlert: {
      variant: 'tonal',
      VBtn: {
        size: 'default',
        variant: 'text',
        rounded: 'sm',
        density: 'compact',
        slim: true,
      },
    },
    VSwitch: {
      color: 'primary',
      hideDetails: 'auto',
    },
    VFab: {
      size: 56,
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
