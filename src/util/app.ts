
/**
 * 判断当前环境是否是 Tauri
 * @returns 当前环境是否是 Tauri
 */
export function isTauri(): boolean {
  return !!(window as any).__TAURI__
}

export function isPwa() {
  return ["fullscreen", "standalone", "minimal-ui"].some(
    (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
  );
}
