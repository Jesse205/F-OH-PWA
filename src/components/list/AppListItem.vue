<script lang="ts" setup>
import { toRefs } from 'vue'
import { useDefaults } from 'vuetify'

interface Props {
  divider?: boolean
  dividerInset?: boolean
  lastInVertical?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  divider: false,
  dividerInset: false,
  lastInVertical: false,
})

const { divider, dividerInset } = toRefs(useDefaults(props))
</script>

<template>
  <v-list-item class="app-list-item" v-bind="$attrs">
    <template v-if="$slots.prepend" #prepend="props"><slot name="prepend" v-bind="props" /></template>
    <template v-if="$slots.append" #append="props"><slot name="append" v-bind="props" /></template>
    <template v-if="$slots.title" #title="props"><slot name="title" v-bind="props" /></template>
    <template v-if="$slots.subtitle" #subtitle="props"><slot name="subtitle" v-bind="props" /></template>
    <template v-if="$slots.default" #="props"><slot name="default" v-bind="props" /></template>
  </v-list-item>
  <v-divider v-if="divider && !lastInVertical" :inset="dividerInset" />
</template>

<style lang="scss" scoped></style>
