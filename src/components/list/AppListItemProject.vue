<script setup lang="ts">
import type { AppInfo } from '@/utils/apps'
import { completeApiUrl } from '@/utils/url'
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

const iconCompletePath = computed(() => completeApiUrl(props.item.icon))
</script>

<template>
  <v-list-item class="project-list-item" lines="two" :to="to">
    <template #prepend>
      <!-- v-img 大量使用会导致卡顿，所以使用原生的 img 标签 -->
      <img class="ohos-app-icon border" width="48" height="48" :src="iconCompletePath" alt="" draggable="false" />
    </template>
    <v-list-item-title class="title">
      {{ item.name }} <span class="text-body-2 version">v{{ item.version }}</span>
    </v-list-item-title>
    <v-list-item-subtitle>{{ item.desc }}</v-list-item-subtitle>
    <slot />
  </v-list-item>
</template>

<style scoped lang="scss">
.project-list-item {
  --border-margin-left: #{48px + 16px};

  .title {
    .version {
      opacity: var(--v-medium-emphasis-opacity);
    }
  }
}
:deep(.v-list-item__spacer) {
  width: 16px;
}
</style>
