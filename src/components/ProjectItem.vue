<script setup lang="ts">
import { AppInfo } from '@/ts/interfaces/app.interfaces'
import { URL_API } from '@/data/constants'
import { getServerCompletePath } from '@/util/url'
import { computed, watch } from 'vue'

const props = defineProps<{
  item: AppInfo
  to: boolean | string | object
}>()

const iconCompletePath = computed(() => getServerCompletePath(props.item.icon, URL_API))
</script>

<template>
  <v-list-item class="project-list-item" lines="two" :to="to === false ? undefined : `/app/${item.id}`">
    <template v-slot:prepend>
      <v-avatar class="icon border" rounded="lg" size="48">
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

<style scoped lang="scss">
.project-list-item {
  --list-item-padding-left: 80px;

  .title {
    .text-caption {
      opacity: var(--v-medium-emphasis-opacity);
    }
  }
  .icon {
    // TODO: 当 F-OH 支持自适应图标后移除这项
    border-radius: 24% !important;
  }
}
</style>
