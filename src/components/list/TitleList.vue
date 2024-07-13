<script setup lang="ts">
import { VList } from 'vuetify/components'

defineProps<{
  title?: string
}>()
</script>

<template>
  <v-list :aria-label="title">
    <v-list-subheader v-if="title" :title="title" />
    <slot />
  </v-list>
</template>
