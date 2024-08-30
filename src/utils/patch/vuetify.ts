/**
 * 在触屏设备上，当用户点击应用了波纹的元素时，波纹不能正确地触发，而是直接显示动画后的状态。通过刻意延迟 `setTimeout` 的 `timeout` 为 0 的函数（插入完成状态的元素），等待dom更新时
 */
function fixVRippleOnMobile() {
  const originSetTimeout = setTimeout
  window.setTimeout = function (handler: TimerHandler, timeout?: number): number {
    if (timeout === 0 && typeof handler === 'function') {
      return originSetTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            handler()
          })
        })
      }, 0)
    } else {
      return originSetTimeout(handler, timeout)
    }
  }
}

export function apply(): void {
  fixVRippleOnMobile()
}
