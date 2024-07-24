<script setup lang="ts">
import AppListCategory from '@/components/list/AppListCategory.vue'
import type { AppInfo } from '@/utils/apps'
import { mdiIdentifier } from '@mdi/js'

defineProps<{
  loading: boolean
  appInfo?: AppInfo
}>()
</script>

<template>
  <app-list-category :subheader="$t('moreInfo')">
    <v-skeleton-loader
      v-if="loading"
      class="skeleton--small-avatar"
      type="list-item-avatar-two-line@2"
      color="transparent"
    />
    <template v-else>
      <v-list-item
        prepend-icon="$clock"
        :title="$t('releaseDate')"
        :subtitle="appInfo?.releaseTime ?? $t('unknown.title')"
      />
      <!-- subtitle 必须为字符串，否则如果为0的话不会添加到对应的元素内 -->
      <v-list-item
        :prepend-icon="mdiIdentifier"
        :title="$t('id')"
        :subtitle="`${appInfo?.id ?? $t('unknown.title')}`"
      />
    </template>
  </app-list-category>
</template>
