import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

/**
 * @see https://unocss.dev/
 */
export default defineConfig({
  presets: [
    presetAttributify({
      strict: true,
      prefixedOnly: true,
    }),
  ],
  rules: [
    ['color-vuetify-warning', { color: 'rgb(var(--v-theme-warning)) !important' }],
    [
      /^margin(-(start|top|end|bottom))?-(\d+)$/,
      ([, , direction, level]) => {
        const value = `${Number(level) * 4}px !important`
        return {
          margin: typeof direction === 'undefined' ? value : undefined,
          'margin-left': direction === 'start' ? value : undefined,
          'margin-right': direction === 'end' ? value : undefined,
          'margin-top': direction === 'top' ? value : undefined,
          'margin-bottom': direction === 'bottom' ? value : undefined,
        }
      },
    ],
    [/^pa-(\d+)$/, ([, level]) => ({ padding: `${Number(level) * 4}px !important` })],
  ],
  blocklist: ['container', /^rounded-/],
})
