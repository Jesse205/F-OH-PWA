<script setup lang="ts">
import { useAttrs } from 'vue'
import { VList } from 'vuetify/components'

defineProps<{
  title?: string
}>()

const attrs = useAttrs()
</script>

<template>
  <v-list v-bind="attrs" :aria-label="title">
    <v-list-subheader v-if="title" :title="title" />
    <slot />
  </v-list>
</template>

<!-- <style scoped></style> -->
