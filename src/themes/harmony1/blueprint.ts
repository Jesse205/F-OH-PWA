import type { Blueprint } from 'vuetify'

import { blueprint as baseBlueprint } from '../base/blueprint'
import { aliases, hmi } from './icons'
import colors from './styles/variables/_colors.module.scss'
import dimensions from './styles/variables/_dimensions.module.scss'

const { defaults: baseDefaults } = baseBlueprint

export const blueprint: Blueprint = {
  theme: {
    themes: {
      // 使用 Material Design 的名称
      light: {
        colors: {
          primary: colors.accentLight,
          secondary: colors.accentLight,

          background: colors.backgroundGrayLight,
          surface: '#ffffff',
          'surface-variant': '#E5E5E5',
          'on-surface-variant': '#000000',
          warning: colors.alertLight,
          error: colors.warningLight,
          info: colors.accentLight,

          'status-bar': colors.backgroundGrayLight,
        },
        variables: {
          'activated-opacity': 0.1,
          'pressed-opacity': 0.1,
          'high-emphasis-opacity': dimensions.opacityLevel1Light,
          'medium-emphasis-opacity': dimensions.opacityLevel2Light,
          'theme-code': '#E5E5E5',
        },
      },
      dark: {
        colors: {
          primary: colors.accentDark,
          secondary: colors.accentDark,

          background: colors.backgroundGrayDark,
          'surface-variant': '#424242',
          'on-surface-variant': '#ffffff',
          'surface-bright': '#ffffff',
          warning: colors.alertDark,
          error: colors.warningDark,
          info: colors.accentDark,

          'status-bar': colors.backgroundGrayDark,
        },
        variables: {
          'activated-opacity': 0.15,
          'pressed-opacity': 0.15,
          'high-emphasis-opacity': dimensions.opacityLevel1Dark,
          'medium-emphasis-opacity': dimensions.opacityLevel2Dark,
        },
      },
    },
  },
  defaults: {
    ...baseDefaults,
    global: {
      ripple: false,
    },
    VAppBar: {
      ...baseDefaults.VAppBar,
      VMenu: {
        width: 172,
      },
    },
    VBtn: {
      ...baseDefaults.VBtn,
      rounded: 'pill',
    },
    VCombobox: {
      variant: 'underlined',
      hideDetails: 'auto',
      persistentPlaceholder: true,
    },
    VSelect: {
      variant: 'underlined',
      hideDetails: 'auto',
      persistentPlaceholder: true,
      transition: 'slide-y-transition',
    },
    VTextarea: {
      variant: 'underlined',
    },
    VTextField: {
      variant: 'underlined',
      hideDetails: 'auto',
      persistentPlaceholder: true,
    },
    VTabs: {
      ...baseDefaults.VTabs,
      density: 'compact',
      VBtn: {
        rounded: 'md',
      },
    },
    VToolbar: {
      ...baseDefaults.VToolbar,
      VBtn: {
        ...baseDefaults.VToolbar.VBtn,
        rounded: 'sm',
      },
    },
    VBottomNavigation: {
      ...baseDefaults.VBottomNavigation,
      VBtn: {
        rounded: 'sm',
        ripple: false,
      },
    },
    VMenu: {
      ...baseDefaults.VMenu,
      minWidth: 172,
      transition: 'slide-y-transition',
      AppList: {
        // carded: false,
      },
    },
    VCard: {
      flat: true,
    },
    AppList: {
      carded: true,
      divider: true,
    },
    VList: {
      lines: false,
      rounded: true,
    },
    VListItem: {
      rounded: true,
      VAvatar: {
        size: 24,
      },
    },
    VNavigationDrawer: {
      ...baseDefaults.VNavigationDrawer,
      width: parseInt(dimensions.widthSidebarPrimary),
      railWidth: 96,
      VList: {
        ...baseDefaults.VNavigationDrawer.VList,
        border: false,
        rounded: false,
      },
      VListItem: {
        VAvatar: {
          size: 'default',
          bgColor: 'background',
        },
      },
    },
    AppDialog: {
      actionButtonLayout: 'fill',
    },
    VDialog: {
      ...baseDefaults.VDialog,
      VCard: {
        ...baseDefaults.VDialog.VCard,
        variant: 'flat',
      },
      VBtn: {
        size: 'large',
      },
    },
    VProgressCircular: {
      ...baseDefaults.VProgressCircular,
      color: undefined,
      width: 3,
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
      ...baseDefaults.VSwitch,
      inset: true,
    },
    VOverlay: {
      opacity: 0.2,
    },
  },
  icons: {
    defaultSet: 'hmi',
    aliases,
    sets: {
      hmi,
    },
  },
}
