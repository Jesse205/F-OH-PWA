export type DisplayModeType = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser' | 'window-controls-overlay'

const PWA_DISPLAY_MODES: DisplayModeType[] = ['standalone', 'minimal-ui', 'window-controls-overlay']

/**
 * 是否以 PWA 模式运行
 * @returns `true` 为以 PWA 模式运行
 */
export function isPwa(): boolean {
  return PWA_DISPLAY_MODES.some((displayMode) => window.matchMedia(`(display-mode: ${displayMode})`).matches)
}

/**
 * 是否以 PWA 模式运行
 * @returns `true` 为以 PWA 模式运行
 */
export function isPwaDisplayMode(displayMode: DisplayModeType): boolean {
  return PWA_DISPLAY_MODES.includes(displayMode)
}
