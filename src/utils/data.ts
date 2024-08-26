import { useArraySome } from '@vueuse/core'
import { computed, ref, shallowReactive, unref, type MaybeRef, type ShallowReactive } from 'vue'
import { clearArray } from './array'

export interface Source<D> {
  key: string
  load: () => Promise<D>
}

export interface SourceState<S extends Source<D>, D, E extends Error> {
  error?: E
  data?: D
  source: S
  timestamp: number
}

export function useMultiSourceData<S extends Source<D>, D, E extends Error>(sources: MaybeRef<S[]>) {
  const isLoading = ref(false)
  const isLoaded = ref(false)
  const stateArray: ShallowReactive<SourceState<S, D, E>[]> = shallowReactive([])
  const errorArray = computed(() => stateArray.map((state) => state.error).filter((error) => error !== undefined))
  const hasErrors = useArraySome(stateArray, (state) => state.error)
  async function loadData() {
    const sourcesValue = unref(sources)
    if (sourcesValue.length === 0) {
      // 当没有任何源时，自然也没有任何数据
      // 如果直接复用else分支中的逻辑，isAllRejected会得到false，不会清空数组
      clearArray(stateArray)
    } else {
      let clearedPreviousStates = false
      const promises = sourcesValue.map((source) =>
        source
          .load()
          .then((data) => {
            if (!clearedPreviousStates) {
              clearArray(stateArray)
              clearedPreviousStates = true
            }
            stateArray.push({
              source,
              data,
              timestamp: Date.now(),
            })
          })
          .catch((reason) => {
            stateArray.push({
              source,
              error: reason,
              timestamp: Date.now(),
            })
          }),
      )
      const result = await Promise.allSettled(promises)
      const isAllRejected = result.every((result) => result.status === 'rejected')
      if (!clearedPreviousStates && !isAllRejected) {
        clearArray(stateArray)
      }
    }
  }

  async function load() {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    try {
      await loadData()
    } finally {
      isLoading.value = false
      isLoaded.value = true
    }
  }
  return {
    isLoading,
    isLoaded,
    stateArray,
    errorArray,
    hasErrors,
    load,
  }
}
