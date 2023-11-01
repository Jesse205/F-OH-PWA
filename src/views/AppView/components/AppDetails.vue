<script setup lang="ts">
import { AppInfo } from '@/ts/interfaces/app.interfaces'

const props = defineProps<{
  loading: boolean
  appInfo?: AppInfo
}>()
</script>

<template>
  <div>
    <v-skeleton-loader v-if="loading" class="detailsSkeleton" type="text@5" color="transparent" />
    <template v-else>
      {{ $t('version.name') }}: {{ appInfo?.version ?? $t('unknown.name') }}<br />
      {{ $t('packageName.name') }}: {{ appInfo?.packageName ?? $t('unknown.name') }}<br />
      {{ $t('developer.name') }}: {{ appInfo?.vender ?? $t('unknown.name') }}<br />
      {{ $t('release.name') }}: {{ appInfo?.releaseTime ?? $t('unknown.name') }}<br />
      {{ $t('id.name') }}: {{ appInfo?.id ?? $t('unknown.name') }}<br />
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
