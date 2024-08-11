/**
 * @see https://developer.huawei.com/consumer/cn/design/harmonyos-icon/
 */
import type { IconAliases, IconSet } from 'vuetify'
import { VSvgIcon } from 'vuetify/components'
import publicConnection from './custom/ic_public_connection.svg?vuetify'
import galleryPrivacyStatement from './official/ic_gallery_privacy_statement.svg?vuetify'
import publicGallerySet from './official/ic_gallery_set.svg?vuetify'
import publicApp from './official/ic_public_app.svg?vuetify'
import publicAppFilled from './official/ic_public_app_filled.svg?vuetify'
import publicArrowLeft from './official/ic_public_arrow_left.svg?component'
import publicArrowRight from './official/ic_public_arrow_right.svg?component'
import publicArrowBack from './official/ic_public_back.svg?vuetify'
import publicCards from './official/ic_public_cards.svg?vuetify'
import publicContacts from './official/ic_public_contacts.svg?vuetify'
import publicContactsFilled from './official/ic_public_contacts_filled.svg?vuetify'
import publicContactsGroup from './official/ic_public_contacts_group.svg?vuetify'
import publicDetail from './official/ic_public_detail.svg?vuetify'
import publicDownloadFilled from './official/ic_public_download_filled.svg?vuetify'
import publicFail from './official/ic_public_fail.svg?vuetify'
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
  app: publicApp,
  apps: publicApp,
  appFilled: publicAppFilled,
  appsFilled: publicAppFilled,
  prev: publicArrowLeft,
  next: publicArrowRight,
  back: publicArrowBack,
  more: publicMore,
  home: publicHome,
  homeFilled: publicHomeFilled,
  info: publicDetail,
  account: publicContacts,
  accountFilled: publicContactsFilled,
  update: publicUpgrade,
  updateFilled: publicUpgradeFilled,
  settings: publicSettings,
  translate: publicTranslateC2E,
  group: publicContactsGroup,
  circle: publicScreenshotCircle, //会多出来个没用的路径
  link: publicConnection,
  share: publicShare,
  clock: publicTime,
  downloadFilled: publicDownloadFilled,
  openInNew: publicGallerySet,
  privacy: galleryPrivacyStatement,
  card: publicCards,
  theme: publicThemes,
  error: publicFail,
  complete: undefined,
  cancel: undefined,
  close: undefined,
  delete: undefined,
  clear: undefined,
  success: undefined,
  warning: undefined,
  checkboxOn: undefined,
  checkboxOff: undefined,
  checkboxIndeterminate: undefined,
  delimiter: undefined,
  sortAsc: undefined,
  sortDesc: undefined,
  expand: undefined,
  menu: undefined,
  subgroup: undefined,
  dropdown: undefined,
  radioOn: undefined,
  radioOff: undefined,
  edit: undefined,
  ratingEmpty: undefined,
  ratingFull: undefined,
  ratingHalf: undefined,
  loading: undefined,
  first: undefined,
  last: undefined,
  unfold: undefined,
  file: undefined,
  plus: undefined,
  minus: undefined,
  calendar: undefined,
  search: undefined,
  lock: undefined,
  square: undefined,
  'window-maximize': undefined,
  'window-close': undefined,
  'window-minimize': undefined,
  'window-restore': undefined,
}
