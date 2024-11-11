<script lang="ts" setup generic="Item">
import { computed, useSlots } from 'vue'

import { refTransformerSingleItemList } from '@/composables/converts'
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
  <app-list-item link :subtitle="displayName">
    <!-- origin="left" 修复小窗时定位错误 -->
    <v-menu activator="parent" origin="left">
      <app-list v-model:selected="valueList" select-strategy="single-leaf" mandatory>
        <app-list-item
          v-for="(item, index) in items"
          v-bind="item"
          :key="valueGetter(item)"
          :title="nameGetter ? nameGetter(item) : valueGetter(item)"
          :value="valueGetter(item)"
          :disabled="disabledGetter ? disabledGetter(item) : false"
          :divider="index >= items.length-1 ? false : undefined"
        />
      </app-list>
    </v-menu>
    <template v-if="slots.subtitle" #subtitle>
      <slot name="subtitle" :display-name="displayName" />
    </template>
    <slot />
  </app-list-item>
</template>

<style lang="scss" scoped></style>
