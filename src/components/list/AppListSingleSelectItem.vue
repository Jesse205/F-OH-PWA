<script lang="ts" setup generic="Item">
import { refTransformerSingleItemList } from '@/composables/converts'
import { computed, useSlots } from 'vue'
const slots = useSlots()
const props = defineProps<{
  items: Item[]
  valueGetter: (item: Item) => string
  nameGetter?: (item: Item) => string
  disabledGetter?: (item: Item) => boolean
}>()

const value = defineModel<string>()
const valueList = refTransformerSingleItemList(value)
const selectedItem = computed(() => props.items.find((item) => props.valueGetter(item) === value.value))
const displayName = computed(() => {
  return selectedItem.value && props.nameGetter ? props.nameGetter(selectedItem.value) : value.value
})
</script>

<template>
  <v-list-item prepend-icon="$translate" link :subtitle="displayName">
    <!-- origin="left" 修复小窗时定位错误 -->

    <v-menu activator="parent" origin="left">
      <v-list v-model:selected="valueList" select-strategy="single-leaf" mandatory>
        <v-list-item
          v-for="item in items"
          v-bind="item"
          :key="valueGetter(item)"
          :title="nameGetter ? nameGetter(item) : valueGetter(item)"
          :value="valueGetter(item)"
          :disabled="disabledGetter ? disabledGetter(item) : false"
        />
      </v-list>
    </v-menu>
    <template v-if="slots.subtitle" #subtitle>
      <slot name="subtitle" :display-name="displayName" />
    </template>
    <slot />
  </v-list-item>
</template>

<style lang="scss" scoped></style>
