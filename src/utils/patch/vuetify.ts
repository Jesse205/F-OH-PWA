import { isChrome } from '@/utils/browser'

function fixVRippleOnMobile() {
  if (!isChrome) {
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
