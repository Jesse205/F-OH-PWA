import type { Blueprint } from 'vuetify'
import { aliases, hmi } from './iconset'
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
    global: {
      ripple: false,
    },
    VAppBar: {
      flat: true,
      density: 'comfortable',
      VTooltip: {
        location: 'bottom',
      },
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
    VTextarea: {
      variant: 'underlined',
    },
    VTextField: {
      variant: 'underlined',
    },
    VSlider: {
      color: 'primary',
    },
    VTabs: {
      color: 'primary',
      VBtn: {
        rounded: 'md',
      },
    },
    VToolbar: {
      VBtn: {
        color: null,
        rounded: 'sm',
      },
      color: 'background',
    },
    VBottomNavigation: {
      bgColor: 'background',
      VBtn: {
        rounded: 'sm',
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
        color: 'primary',
        activeClass: 'v-list-item--active-background',
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
    VList: {
      lines: false,
      rounded: true,
    },
    AppCategoryList: {
      lines: false,
      rounded: true,
      class: ['app-category-list'],
    },
    VListItem: {
      rounded: true,
      VAvatar: {
        size: '24',
      },
    },
    VNavigationDrawer: {
      color: 'background',
      width: parseInt(dimensions.widthSidebarPrimary),
      railWidth: 96,
      VList: {
        color: 'primary',
        activeClass: 'v-list-item--active-background',
        lines: 'one',
      },
      VListItem: {
        VAvatar: {
          size: 'default',
          bgColor: 'background',
        },
      },
      VTooltip: {
        location: 'right',
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
      width: 3,
      size: '40',
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
      inset: true,
      hideDetails: 'auto',
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
