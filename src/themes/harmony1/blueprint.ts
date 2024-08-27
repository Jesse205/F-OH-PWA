import type { Blueprint } from 'vuetify'
import { blueprint as baseBlueprint } from '../base/blueprint'
import { aliases, hmi } from './icons'
import colors from './styles/settings/_colors.module.scss'
import dimensions from './styles/settings/_dimensions.module.scss'
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
    ...baseBlueprint.defaults,
    global: {
      ripple: false,
    },
    VAppBar: {
      ...baseBlueprint.defaults.VAppBar,
      VMenu: {
        width: 172,
      },
    },
    VBtn: {
      ...baseBlueprint.defaults.VBtn,
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
      ...baseBlueprint.defaults.VTabs,
      VBtn: {
        rounded: 'md',
      },
    },
    VToolbar: {
      ...baseBlueprint.defaults.VToolbar,
      VBtn: {
        ...baseBlueprint.defaults.VToolbar.VBtn,
        rounded: 'sm',
      },
    },
    VBottomNavigation: {
      ...baseBlueprint.defaults.VBottomNavigation,
      VBtn: {
        rounded: 'sm',
        ripple: false,
      },
    },
    VMenu: {
      ...baseBlueprint.defaults.VMenu,
      minWidth: 172,
      transition: 'slide-y-transition',
    },
    VCard: {
      flat: true,
    },
    VList: {
      lines: false,
      rounded: true,
    },
    AppCategoryList: {
      ...baseBlueprint.defaults.AppCategoryList,
      lines: false,
      rounded: true,
    },
    VListItem: {
      rounded: true,
      VAvatar: {
        size: '24',
      },
    },
    VNavigationDrawer: {
      ...baseBlueprint.defaults.VNavigationDrawer,
      width: parseInt(dimensions.widthSidebarPrimary),
      railWidth: 96,
      VListItem: {
        VAvatar: {
          size: 'default',
          bgColor: 'background',
        },
      },
    },
    VDialog: {
      transition: 'dialog-transition',
      VCard: {
        color: 'surface',
        variant: 'flat',
      },
      VBtn: {
        size: 'large',
      },
    },
    VProgressCircular: {
      ...baseBlueprint.defaults.VProgressCircular,
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
      ...baseBlueprint.defaults.VSwitch,
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
