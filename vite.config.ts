// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// Manifest
import manifest from './manifest'

const isTauri = !!process.env.TAURI_FAMILY
const isTauriDebug = !!process.env.TAURI_DEBUG
const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      /* styles: {
        configFile: 'src/styles/settings.scss',
      }, */
    }),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      workbox: {
        cleanupOutdatedCaches: true,
      },
      manifest,
      disable: isTauri && isProduction,
    }),
  ],
  define: {
    'process.env': {},
    __VERSION__: JSON.stringify(process.env.npm_package_version),
    __IS_TAURI__: isTauri,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
    // Tauri expects a fixed port, fail if that port is not available
    strictPort: true,
    proxy: {
      '/api/gogs': {
        target: 'http://74.48.94.162:3000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gogs/, ''),
      },
    },
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    // don't minify for debug builds
    minify: !isTauriDebug ? 'esbuild' : false,
    // 为调试构建生成源代码映射 (sourcemap)
    sourcemap: isTauriDebug || !isProduction,
  },
})
