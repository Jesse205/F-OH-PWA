import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export function useLandscapeLayout() {
  const { width, height } = useWindowSize()
  const isLandscapeNeeded = computed(() => {
    const ratio = width.value / height.value
    return ratio > 4 / 3
  })
  return { isLandscapeNeeded }
}
