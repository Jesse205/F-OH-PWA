<script lang="ts" setup>
import AppRow from './AppRow.vue'
defineProps<{
  fluid?: boolean
}>()
</script>

<template>
  <AppRow class="app-container" :class="{ 'app-container--fluid': fluid }">
    <div class="app-container__content">
      <slot />
    </div>
  </AppRow>
</template>
