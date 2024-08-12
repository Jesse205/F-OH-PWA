function fixVRippleOnMobile() {
  if (!('chrome' in window)) {
    return
  }
  const originSetTimeout = setTimeout
  window.setTimeout = function (handler: TimerHandler, timeout?: number): number {
    if (timeout === 0) {
      return originSetTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            originSetTimeout(handler, 0)
          })
        })
      }, 0)
    } else {
      return originSetTimeout(handler, timeout)
    }
  }
}

export function apply() {
  fixVRippleOnMobile()
}
