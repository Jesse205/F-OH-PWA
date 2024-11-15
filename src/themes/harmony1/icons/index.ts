/**
 * @see https://developer.huawei.com/consumer/cn/design/harmonyos-icon/
 */

import type { IconAliases, IconSet } from 'vuetify'
import { VSvgIcon } from 'vuetify/components'

import publicArrowDown0 from './custom/ic_public_arrow_down_0.svg?vuetify'
import publicConnection from './custom/ic_public_connection.svg?vuetify'
import publicGallerySet from './official/ic_gallery_set.svg?vuetify'
import publicAddFilled from './official/ic_public_add_filled.svg?vuetify'
import publicApp from './official/ic_public_app.svg?vuetify'
import publicAppFilled from './official/ic_public_app_filled.svg?vuetify'
import publicArrowLeft from './custom/ic_public_arrow_left.svg?component'
import publicArrowRight from './custom/ic_public_arrow_right.svg?component'
import publicArrowBack from './official/ic_public_back.svg?vuetify'
import publicCards from './official/ic_public_cards.svg?vuetify'
import publicContacts from './official/ic_public_contacts.svg?vuetify'
import publicContactsFilled from './official/ic_public_contacts_filled.svg?vuetify'
import publicContactsGroup from './official/ic_public_contacts_group.svg?vuetify'
import publicDetail from './official/ic_public_detail.svg?vuetify'
import publicDownloadFilled from './official/ic_public_download_filled.svg?vuetify'
import publicFail from './official/ic_public_fail.svg?vuetify'
import publicFile from './official/ic_public_file.svg?vuetify'
import publicHome from './official/ic_public_home.svg?vuetify'
import publicHomeFilled from './official/ic_public_home_filled.svg?vuetify'
import publicMore from './official/ic_public_more.svg?vuetify'
import publicSettings from './official/ic_public_settings.svg?vuetify'
import publicShare from './official/ic_public_share.svg?vuetify'
import publicThemes from './official/ic_public_themes.svg?vuetify'
import publicTime from './official/ic_public_time.svg?vuetify'
import publicTranslateC2E from './official/ic_public_translate_c2e.svg?vuetify'
import publicUpgrade from './official/ic_public_upgrade.svg?vuetify'
import publicUpgradeFilled from './official/ic_public_upgrade_filled.svg?vuetify'
import publicScreenshotCircleOrigin from './official/ic_screenshot_circle.svg?vuetify'

const [publicScreenshotCircle] = publicScreenshotCircleOrigin

export const hmi: IconSet = {
  component: VSvgIcon,
}

export const aliases: IconAliases = {
  complete: '',
  cancel: '',
  close: '',
  delete: '',
  clear: '',
  success: '',
  info: publicDetail,
  warning: publicFail,
  error: publicFail,
  prev: publicArrowLeft,
  next: publicArrowRight,
  checkboxOn: '',
  checkboxOff: '',
  checkboxIndeterminate: '',
  delimiter: '',
  sortAsc: '',
  sortDesc: '',
  expand: '',
  menu: '',
  subgroup: '',
  dropdown: publicArrowDown0,
  radioOn: '',
  radioOff: '',
  edit: '',
  ratingEmpty: '',
  ratingFull: '',
  ratingHalf: '',
  loading: '',
  first: '',
  last: '',
  unfold: '',
  file: '',
  plus: '',
  minus: '',
  calendar: '',
  openInNew: publicGallerySet,
  back: publicArrowBack,
  settings: publicSettings,
  foh: publicScreenshotCircle,
  more: publicMore,
  share: publicShare,
  link: publicConnection,
  clock: publicTime,
  home: publicHome,
  developer: publicContacts,
  navigation_home: publicHome,
  navigation_home_active: publicHomeFilled,
  navigation_apps: publicApp,
  navigation_apps_active: publicAppFilled,
  navigation_update: publicUpgrade,
  navigation_update_active: publicUpgradeFilled,
  navigation_me: publicContacts,
  navigation_me_active: publicContactsFilled,
  iconButton_download: publicDownloadFilled,
  setting_language: publicTranslateC2E,
  setting_design: publicThemes,
  settings_animation: publicThemes,
  about_licenses: publicFile,
  about_donate: publicCards,
  about_group: publicContactsGroup,
  floating_add: publicAddFilled,
}
