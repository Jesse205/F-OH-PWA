import { computed, type Ref } from 'vue'

export function refTransformerSingleItemList<T>(inputRef: Ref<T>, outputRef: Ref<T> = inputRef) {
  return computed({
    get: () => [inputRef.value],
    set: (newValues) => {
      outputRef.value = newValues[0]
    },
  })
}

/**
 * 创建一个 `Ref`，从 `inputRef` 取值，提交到 `outputRef`
 */
export function refTransformer<T>(inputRef: Ref<T>, outputRef: Ref<T>) {
  return computed({
    get: () => inputRef.value,
    set: (newValue) => {
      outputRef.value = newValue
    },
  })
}
