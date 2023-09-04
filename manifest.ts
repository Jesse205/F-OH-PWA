import { ManifestOptions } from "vite-plugin-pwa";

export default <Partial<ManifestOptions>>{
  name: 'F-OH PWA',
  short_name: 'F-OH',
  description: 'F-OH 的第三方 PWA 版本',
  orientation: 'any',
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
  display: 'standalone'
}
