import { usePrevious } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export function useRoutePosition() {
  const router = useRouter()
  const currentPosition = computed(() => {
    router.currentRoute.value
    return isNaN(history.state.position) ? 0 : Number(history.state.position)
  })
  const previousPosition = usePrevious(currentPosition, 0)
  const isForward = computed(() => currentPosition.value > previousPosition.value)
  return { currentPosition, previousPosition, isForward }
}
