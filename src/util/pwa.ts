export type DisplayModeType = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser' | 'window-controls-overlay'

/**
 * 是否以 PWA 模式运行
 * @returns `true` 为以 PWA 模式运行
 */
export function isPwa(): boolean {
  return ['fullscreen', 'standalone', 'minimal-ui'].some(
    (displayMode) => window.matchMedia(`(display-mode: ${displayMode})`).matches,
  )
}

export function isPwaDisplayMode(displayMode: DisplayModeType) {
  return displayMode === 'standalone' || displayMode === 'minimal-ui' || displayMode === 'window-controls-overlay'
}
