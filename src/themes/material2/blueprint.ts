import type { Blueprint } from 'vuetify'

import { blueprint as baseBlueprint } from '../base/blueprint'
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
    ...baseBlueprint.defaults,
    global: {
      rounded: 'default',
    },
    VAvatar: {
      rounded: 'circle',
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
    VTextarea: {
      variant: 'outlined',
    },
    VTextField: {
      color: 'primary',
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VAppBar: {
      ...baseBlueprint.defaults.VAppBar,
      border: 'b',
      VMenu: {
        width: 196,
        origin: 'overlap',
      },
    },
    VBottomNavigation: {
      ...baseBlueprint.defaults.VBottomNavigation,
      border: 't',
    },
    VMenu: {
      ...baseBlueprint.defaults.VMenu,
      minWidth: 196,
      VList: {
        ...baseBlueprint.defaults.VMenu.VList,
        elevation: '8',
        border: false,
      },
    },
    VCard: {
      border: true,
      variant: 'outlined',
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
      ...baseBlueprint.defaults.AppCategoryList,
      bgColor: 'transparent',
      lines: false,
      border: false,
      rounded: true,
    },
    VNavigationDrawer: {
      ...baseBlueprint.defaults.VNavigationDrawer,
      VList: {
        ...baseBlueprint.defaults.VNavigationDrawer.VList,
        border: false,
        rounded: false,
      },
      VListItem: {
        rounded: true,
      },
    },
    VDialog: {
      ...baseBlueprint.defaults.VDialog,
      VCard: {
        ...baseBlueprint.defaults.VDialog.VCard,
        elevation: '24',
        variant: 'elevated',
      },
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
