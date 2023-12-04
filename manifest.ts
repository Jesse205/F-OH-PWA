import type { ManifestOptions } from 'vite-plugin-pwa'

const base = '/'

export default {
  name: 'F-OH PWA',
  short_name: 'F-OH',
  description: 'F-OH 的第三方 PWA 版本',
  // orientation: 'natural',
  prefer_related_applications: true,
  id: 'org.ohosdev.foh.pwa',
  start_url: base,
  icons: [
    {
      src: `${base}icons/android-chrome-192x192.png`,
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: `${base}icons/android-chrome-512x512.png`,
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: `${base}icons/maskable_icon_x96.png`,
      sizes: '96x96',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: `${base}icons/maskable_icon_x192.png`,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: `${base}icons/maskable_icon_x512.png`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: `${base}icons/maskable_icon.png`,
      sizes: '1024x1024',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
  theme_color: '#0A59F7',
  display: 'standalone',
  display_override: ['standalone', 'minimal-ui', 'browser', 'window-controls-overlay'],
  screenshots: [
    {
      src: `${base}screenshots/Snipaste_2023-12-05_05-17-05.webp`,
      sizes: '502x802',
      type: 'image/webp',
    },
    {
      src: `${base}screenshots/Snipaste_2023-12-05_05-17-10.webp`,
      sizes: '502x802',
      type: 'image/webp',
    },
    {
      src: `${base}screenshots/Snipaste_2023-12-05_05-17-15.webp`,
      sizes: '502x802',
      type: 'image/webp',
    },
    {
      src: `${base}screenshots/Snipaste_2023-12-05_05-16-05.webp`,
      sizes: '962x602',
      type: 'image/webp',
    },
    {
      src: `${base}screenshots/Snipaste_2023-12-05_05-16-10.webp`,
      sizes: '962x602',
      type: 'image/webp',
    },
    {
      src: `${base}screenshots/Snipaste_2023-12-05_05-16-17.webp`,
      sizes: '962x602',
      type: 'image/webp',
    },
  ],
  related_applications: [
    {
      platform: 'f-oh',
      url: 'https://gitee.com/ohos-dev/f-oh',
      id: 'org.ohosdev.foh',
    },
  ],
} satisfies Partial<ManifestOptions>
