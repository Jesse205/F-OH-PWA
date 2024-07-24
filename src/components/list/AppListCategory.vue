<script lang="ts" setup>
import { useSlots } from 'vue'

const slots = useSlots()
defineProps<{
  subheader?: string
}>()
</script>

<template>
  <div class="app-list-category">
    <v-list-subheader v-if="subheader || slots.subheader">
      <slot name="subheader">{{ subheader }}</slot>
    </v-list-subheader>
    <div class="app-list-category__item-container">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
