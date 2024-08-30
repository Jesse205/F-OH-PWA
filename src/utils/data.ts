import { computed, type MaybeRef, ref, type ShallowReactive, shallowReactive, unref } from 'vue'

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
  const hasErrors = computed(() => errorArray.value.length > 0)
  async function loadData() {
    const sourcesValue = unref(sources)
    if (sourcesValue.length === 0) {
      // 当没有任何源时，自然也没有任何数据
      // 如果直接复用else分支中的逻辑，isAllRejected会得到false，不会清空数组
      clearArray(stateArray)
    } else {
      const errorArray: SourceState<S, D, E>[] = []
      let clearedPreviousStates = false
      const promises = sourcesValue.map((source) =>
        source
          .load()
          .then((data) => {
            if (!clearedPreviousStates) {
              clearArray(stateArray)
              stateArray.push(...errorArray)
              clearedPreviousStates = true
            }
            stateArray.push({
              source,
              data,
              timestamp: Date.now(),
            })
          })
          .catch((reason) => {
            console.error('Load data failed:', reason)
            const errorState: SourceState<S, D, E> = {
              source,
              error: reason,
              timestamp: Date.now(),
            }
            stateArray.push(errorState)
            errorArray.push(errorState)
          }),
      )
      await Promise.allSettled(promises)
      // 全部出错时，不清空原始数据
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
