<script lang="ts" setup>
import { currentDesignConfig } from '@/themes'

const { actionsBarMode } = currentDesignConfig.features.dialog
</script>

<template>
  <template v-if="actionsBarMode === 'fill'">
    <slot name="negative" />
    <slot name="neutral" />
    <slot name="positive" />
  </template>
  <template v-else>
    <slot name="neutral" />
    <v-spacer />
    <slot name="negative" />
    <slot name="positive" />
  </template>
</template>

<style lang="scss" scoped></style>
