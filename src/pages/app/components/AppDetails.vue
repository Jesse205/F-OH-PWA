<script setup lang="ts">
import TitleList from '@/components/list/AppList.vue'
import type { AppInfo } from '@/utils/apps'
import { mdiIdentifier } from '@mdi/js'

defineProps<{
  loading: boolean
  appInfo?: AppInfo
}>()
</script>

<template>
  <title-list lass="my-4" lines="two" :title="$t('moreInfo')">
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
  </title-list>
</template>
