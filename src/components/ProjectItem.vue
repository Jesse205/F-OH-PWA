<script setup lang="ts">
import { AppInfo } from '@/ts/interfaces/app.interfaces'
import { URL_API } from '@/data/constants'
import { getServerCompletePath } from '@/util/url'
import { computed } from 'vue'

const props = defineProps<{
  item: AppInfo
}>()

const iconCompletePath = computed(() => {
  return getServerCompletePath(props.item.icon, URL_API)
})
</script>

<template>
  <v-list-item lines="two" :to="`/app/${item.id}`">
    <template v-slot:prepend>
      <v-avatar class="elevation-1" rounded="lg" size="48">
        <v-img :src="iconCompletePath" />
      </v-avatar>
    </template>
    <v-list-item-title class="title">
      {{ item.name }} <span class="text-caption">v{{ item.version }}</span>
    </v-list-item-title>
    <v-list-item-subtitle>{{ item.desc }}</v-list-item-subtitle>
    <slot />
  </v-list-item>
</template>

<style lang="scss">
.title {
  .text-caption {
    opacity: var(--v-high-emphasis-opacity);
  }
}
</style>
