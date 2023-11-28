<script setup lang="ts">
import type { AppInfo } from '@/ts/interfaces/app.interfaces'

defineProps<{
  loading: boolean
  appInfo?: AppInfo
}>()
</script>

<template>
  <v-list class="my-4" lines="two">
    <v-list-subheader>{{ $t('more.info') }}</v-list-subheader>
    <v-skeleton-loader class="skeleton-more" type="list-item-avatar-two-line@2" color="transparent" :loading="loading">
      <v-list-item
        prepend-icon="mdi-clock-outline"
        :title="$t('release.date')"
        :subtitle="appInfo?.releaseTime ?? $t('unknown.name')"
        width="100%"
      />
      <!-- subtitle 必须为字符串，否则不会添加到对应的元素内 -->
      <v-list-item
        prepend-icon="mdi-identifier"
        :title="$t('id.name')"
        :subtitle="`${appInfo?.id ?? $t('unknown.name')}`"
        width="100%"
      />
    </v-skeleton-loader>
  </v-list>
</template>

<style scoped lang="scss">
.skeleton-more:deep(.v-skeleton-loader__avatar) {
  width: 24px;
  min-width: 24px;
  height: 24px;
  min-height: 24px;
  margin-right: 32px;
}
</style>
