import { ref, toRef, type MaybeRef, type Ref } from 'vue'

interface Loader<Data> {
  name: string
  key: string
  load: () => Promise<Data>
}

export class LoadError extends Error {
  constructor(
    public name: string,
    public key: string,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options)
  }
}

export function useAsyncData<Data>(loaders: MaybeRef<Loader<Data>[]>) {
  const loadersRef = toRef(loaders)

  const isLoading = ref(false)
  const isLoaded = ref(false)
  const errorArray = ref<LoadError[]>([])
  const dataArray: Ref<Data[]> = ref([])

  async function load() {
    isLoading.value = true
    errorArray.value = []
    const promises = loadersRef.value.map(async ({ load, name, key }) => {
      try {
        const data = await load()
        dataArray.value.push(data)
      } catch (reason) {
        const message: string = reason instanceof Error ? reason.message : String(reason)
        errorArray.value.push(new LoadError(name, key, message, { cause: reason }))
      }
    })
    await Promise.allSettled(promises)
    isLoading.value = false
    isLoaded.value = true
  }
  return {
    isLoading,
    isLoaded,
    errorArray,
    dataArray,
    load,
  }
}
