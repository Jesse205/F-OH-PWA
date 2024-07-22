import { computed, type Ref } from 'vue'

function refTransformerSingleItemList<T>(inputRef: Ref<T>, outputRef: Ref<T> = inputRef) {
  return computed({
    get: () => [inputRef.value],
    set: (newValues) => {
      outputRef.value = newValues[0]
    },
  })
}

function refTransformer<T>(inputRef: Ref<T>, outputRef: Ref<T>) {
  return computed({
    get: () => inputRef.value,
    set: (newValue) => {
      outputRef.value = newValue
    },
  })
}

export function useSingleSelectedUi<Item, Value>(
  data: Item[],
  getValue: Ref<Value>,
  setValue: Ref<Value> | undefined = undefined,
  valueGetter: (item: Item) => Value,
  nameGetter: (item: Item) => string,
) {
  const selectedValues = refTransformerSingleItemList(getValue, setValue)
  const selectedValue = setValue ? refTransformer(getValue, setValue) : getValue
  const selectedItem = computed(() => data.find((item) => valueGetter(item) === getValue.value))
  const selectedName = computed(() => (selectedItem.value ? nameGetter(selectedItem.value) : undefined))
  return { selectedValues, selectedName, selectedValue }
}
