type LicenseSpdx =
  | 'AGPL-3.0'
  | 'Apache-2.0'
  | 'BSD-2-Clause'
  | 'BSD-3-Clause'
  | 'EPL-2.0'
  | 'GPL-2.0'
  | 'GPL-3.0'
  | 'ISC'
  | 'LGPL-2.1'
  | 'LGPL-3.0'
  | 'MIT'

export interface Project {
  name: string
  summary?: string
  key: string
  license: LicenseSpdx
  licenseUrl: string
  url?: string
  vendor?: string
}

export const projects: Project[] = [
  {
    name: 'F-OH PWA',
    summary: '跨平台的在线第三方 F-OH 客户端',
    key: 'f-oh-pwa',
    license: 'GPL-3.0',
    licenseUrl: 'https://gitee.com/Jesse205/F-OH-PWA/blob/main/LICENSE',
    url: 'https://gitee.com/Jesse205/F-OH-PWA',
    vendor: 'Jesse205',
  },
  {
    name: 'F-OH',
    summary:
      'F-OH 是一个 OpenHarmony 平台上 FOSS（Free and Open Source Software，自由开源软件）的应用中心，并提供下载安装支持',
    key: 'f-oh',
    license: 'GPL-3.0',
    licenseUrl: 'https://gitee.com/westinyang/f-oh/blob/master/LICENSE',
    url: 'https://gitee.com/westinyang/f-oh',
    vendor: 'westinyang',
  },
  {
    name: 'Vue',
    summary: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
    key: 'vue',
    license: 'MIT',
    licenseUrl: 'https://github.com/vuejs/core/blob/main/LICENSE',
    url: 'https://github.com/vuejs/core',
    vendor: 'Vue',
  },
  {
    name: 'Vuetify',
    summary: 'Vue Component Framework',
    key: 'vuetify',
    license: 'MIT',
    licenseUrl: 'https://github.com/vuetifyjs/vuetify/blob/master/LICENSE.md',
    url: 'https://github.com/vuetifyjs/vuetify',
    vendor: 'vuetify',
  },
  {
    name: 'VitePWA',
    summary: 'Zero-config PWA for Vite',
    key: 'vite-pwa',
    license: 'MIT',
    licenseUrl: 'https://github.com/vite-pwa/vite-plugin-pwa/blob/main/LICENSE',
    url: 'https://github.com/vite-pwa/vite-plugin-pwa',
    vendor: 'vite-pwa',
  },
  {
    name: 'Vue I18n',
    summary: 'Internationalization plugin for Vue.js',
    key: 'vue-i18n',
    license: 'MIT',
    licenseUrl: 'https://github.com/intlify/vue-i18n/blob/master/LICENSE',
    url: 'https://github.com/intlify/vue-i18n',
    vendor: 'intlify',
  },
  {
    name: 'Material Design Icons',
    summary:
      "The original. Following Google's Material Design guidelines for system icons, MDI is our largest library, touting over 7200 unique icons!",
    key: 'material-design-icons',
    license: 'Apache-2.0',
    licenseUrl: 'https://pictogrammers.com/docs/general/license/',
    url: 'https://pictogrammers.com/library/mdi/',
    vendor: 'Pictogrammers',
  },
  {
    name: 'Vite SVG loader',
    summary: 'Vite plugin to load SVG files as Vue components',
    key: 'vite-svg-loader',
    license: 'MIT',
    licenseUrl: 'https://github.com/jpkleemans/vite-svg-loader/blob/main/LICENSE',
    url: 'https://github.com/jpkleemans/vite-svg-loader',
    vendor: 'Jan-Paul Kleemans',
  },
]
