import { fileURLToPath, URL } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { StringOptions } from 'sass'
import { defineConfig, UserConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import manifest from './manifest'
import svgLoader from './plugins/svgLoader'

const isTauri = !!process.env.TAURI_FAMILY
const isProduction = process.env.NODE_ENV === 'production'
const isDevelop = !isProduction

let target: string | undefined
if (isTauri) {
  // Tauri 在 Windows 上使用 Chromium，在 macOS 和 Linux 上使用 WebKit
  target = process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13'
} else {
  target = 'chrome87'
}

interface VitePreprocessorOptionsSass extends StringOptions<'async'> {
  api: 'legacy' | 'modern' | 'modern-compiler'
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
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
      __IS_TAURI__: isDevelop ? `'__TAURI_INTERNALS__' in window` : isTauri,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json', '.vue'],
    },
    css: {
      preprocessorMaxWorkers: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        } satisfies VitePreprocessorOptionsSass,
      },
      lightningcss: {},
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
      cssTarget: target,
      cssMinify: 'lightningcss',
      sourcemap: isDevelop,
    },
  } satisfies UserConfig
})
