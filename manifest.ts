import { ManifestOptions } from "vite-plugin-pwa";

export default <Partial<ManifestOptions>>{
  name: 'F-OH PWA',
  short_name: 'F-OH',
  description: 'F-OH 的第三方 PWA 版本',
  orientation: 'natural',
  prefer_related_applications: true,
  id:'org.ohosdev.foh.pwa',
  icons: [
    {
      src: '/icons/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/icons/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    },
    {
      src: '/icons/maskable_icon_x96.png',
      sizes: '96x96',
      type: 'image/png',
      purpose: 'maskable'
    },
    {
      src: '/icons/maskable_icon_x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable'
    },
    {
      src: '/icons/maskable_icon_x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable'
    },
    {
      src: '/icons/maskable_icon.png',
      sizes: '1024x1024',
      type: 'image/png',
      purpose: 'maskable'
    }
  ],
  theme_color: '#00a6f9',
  display: 'standalone',
  display_override: [
    'standalone',
    'minimal-ui',
    'browser',
    'window-controls-overlay'
  ],
  screenshots: [
    {
      src: '/screenshots/Snipaste_2023-09-06_21-32-26.webp',
      sizes: '502x776',
      type: 'image/webp'
    },
    {
      src: '/screenshots/Snipaste_2023-09-06_21-32-39.webp',
      sizes: '502x776',
      type: 'image/webp'
    },
    {
      src: '/screenshots/Snipaste_2023-09-06_21-32-50.webp',
      sizes: '502x776',
      type: 'image/webp'
    },
    {
      src: '/screenshots/Snipaste_2023-09-06_21-33-22.webp',
      sizes: '986x607',
      type: 'image/webp'
    },
    {
      src: '/screenshots/Snipaste_2023-09-06_21-33-28.webp',
      sizes: '986x607',
      type: 'image/webp'
    },
    {
      src: '/screenshots/Snipaste_2023-09-06_21-33-35.webp',
      sizes: '986x607',
      type: 'image/webp'
    },
  ],
  related_applications: [
    {
      platform: 'f-oh',
      url: 'https://gitee.com/ohos-dev/f-oh',
      id: 'org.ohosdev.foh'
    }
  ]
}
