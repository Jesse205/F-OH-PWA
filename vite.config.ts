import { fileURLToPath, URL } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import manifest from './manifest'
import svgLoader from './plugins/svgLoader'

const isTauri = !!process.env.TAURI_FAMILY
const isTauriDebug = !!process.env.TAURI_DEBUG
const isProduction = process.env.NODE_ENV === 'production'
const isDebug = !isProduction

let target: string | undefined
if (isTauri) {
  // Tauri 在 Windows 上使用 Chromium，在 macOS 和 Linux 上使用 WebKit
  target = process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13'
} else {
  target = undefined
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    // https://vite-pwa-org.netlify.app/
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      workbox: {
        cleanupOutdatedCaches: true,
      },
      manifest,
      disable: isTauri,
    }),
    svgLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
    legacy({
      modernPolyfills: true,
      renderLegacyChunks: false,
    }),
  ],
  define: {
    'process.env': {},
    __VERSION__: JSON.stringify(process.env.npm_package_version),
    __HOMEPAGE__: JSON.stringify(process.env.npm_package_homepage),
    __IS_TAURI__: isTauri,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json', '.vue'],
  },
  css: {
    devSourcemap: isTauriDebug || isDebug,
  },
  esbuild: {},
  server: {
    port: 3000,
    // Tauri 期望使用固定端口，如果端口不可用，则会失败
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_', 'FOHPWA_'],
  build: {
    target,
    minify: 'terser',
    // 为调试构建生成源代码映射 (sourcemap)
    sourcemap: isTauriDebug || isDebug,
    reportCompressedSize: false,
    terserOptions: {
      nameCache: {},
      ecma: 2016,
      /* ecma: 2016,
      compress: {
        ecma: 2016,
        passes: 5,
        unsafe_math: true,
        unsafe_proto: true,
      },
      mangle: {
        properties: {
          keep_quoted: 'strict',
        },
      },
      format: {
        ecma: 2016,
      }, */
    },
  },
})
