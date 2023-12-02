<script setup lang="ts">
import type { AppInfo } from '@/ts/interfaces/app.interfaces'
import { URL_API } from '@/data/constants'
import { getServerCompletePath } from '@/util/url'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    item: AppInfo
    to?: boolean | string | object
  }>(),
  {
    to: true,
  },
)
const to = computed((): string | object | undefined => {
  if (props.to === true) {
    return `/app/${props.item.packageName}`
  } else if (props.to) {
    return to
  } else {
    return undefined
  }
})

const iconCompletePath = computed(() => getServerCompletePath(props.item.icon, URL_API))
</script>

<template>
  <v-list-item class="project-list-item" lines="two" :to="to">
    <template v-slot:prepend>
      <v-avatar class="icon border" rounded="lg" size="48">
        <!-- v-img 大量使用会导致卡顿，所以使用原生的 img 标签 -->
        <img width="48" :src="iconCompletePath" alt="" />
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
