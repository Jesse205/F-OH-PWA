import { computed, type Ref } from 'vue'

export function useSingleSelected<T>(getValue: Ref<T>, setValue: Ref<T> = getValue) {
  return computed({
    get: () => [getValue.value],
    set: (newValues) => {
      setValue.value = newValues[0]
    },
  })
}
