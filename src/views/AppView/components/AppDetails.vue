<script setup lang="ts">
import TitleList from '@/components/list/TitleList.vue'
import type { AppInfo } from '@/ts/interfaces/app.interfaces'
import { mdiIdentifier } from '@mdi/js'

defineProps<{
  loading: boolean
  appInfo?: AppInfo
}>()
</script>

<template>
  <title-list lass="my-4" lines="two" :title="$t('more.info')">
    <v-skeleton-loader v-if="loading" class="skeleton-more" type="list-item-avatar-two-line@2" color="transparent" />
    <template v-else>
      <v-list-item
        prepend-icon="$clock"
        :title="$t('release.date')"
        :subtitle="appInfo?.releaseTime ?? $t('unknown.name')"
      />
      <!-- subtitle 必须为字符串，否则如果为0的话不会添加到对应的元素内 -->
      <v-list-item
        :prepend-icon="mdiIdentifier"
        :title="$t('id.name')"
        :subtitle="`${appInfo?.id ?? $t('unknown.name')}`"
      />
    </template>
  </title-list>
</template>

<style scoped lang="scss">
.skeleton-more:deep(.v-skeleton-loader__avatar) {
  width: 24px;
  min-width: 24px;
  height: 24px;
  min-height: 24px;
  margin-right: 16px;
}
</style>
