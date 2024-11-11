import type { Blueprint } from 'vuetify'

export const blueprint = {
  defaults: {
    VToolbar: {
      VBtn: {
        color: null,
      },
      color: 'background',
    },
    VAppBar: {
      flat: true,
      density: 'comfortable',
      VTooltip: {
        location: 'bottom',
      },
    },
    VBottomNavigation: {
      bgColor: 'background',
      grow: true,
      color: 'primary',
      elevation: 0,
    },
    VNavigationDrawer: {
      color: 'background',
      VList: {
        color: 'primary',
        activeClass: 'v-list-item--active-background',
        lines: 'one',
      },
    },
    VMenu: {
      scrim: 'true',
      opacity: 0,
      VList: {
        color: 'primary',
        bgColor: 'surface',
        activeClass: 'v-list-item--active-background',
      },
    },
    VBtn: {
      color: 'primary',
    },
    /* AppCategoryList: {
      class: ['app-category-list'],
    }, */
    VTooltip: {
      transition: 'fade-transition',
    },
    VDialog: {
      transition: 'dialog-transition',
      scrollable: true,
      VCard: {
        border: false,
      },
    },
    /* DialogContentList: {
      class: ['dialog-content-list'],
    }, */
    VCheckboxBtn: {
      color: 'primary',
    },
    VSwitch: {
      color: 'primary',
      hideDetails: 'auto',
    },
    VSlider: {
      color: 'primary',
    },
    VTabs: {
      color: 'primary',
    },
    VCheckbox: {
      color: 'secondary',
    },
    VProgressCircular: {
      color: 'primary',
      width: 4,
      size: '48',
    },
  },
} satisfies Blueprint
