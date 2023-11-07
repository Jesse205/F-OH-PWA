<script setup lang="ts">
import { AppInfo } from '@/ts/interfaces/app.interfaces'

defineProps<{
  loading: boolean
  appInfo?: AppInfo
}>()
</script>

<template>
  <v-list class="my-4" border rounded="lg">
    <v-list-subheader>{{ $t('details.name') }}</v-list-subheader>
    <v-skeleton-loader class="" type="text@5" color="transparent" :loading="loading">
      <v-list-item>
        {{ $t('version.name') }}: {{ appInfo?.version ?? $t('unknown.name') }}<br />
        {{ $t('packageName.name') }}: {{ appInfo?.packageName ?? $t('unknown.name') }}<br />
        {{ $t('developer.name') }}: {{ appInfo?.vender ?? $t('unknown.name') }}<br />
        {{ $t('release.name') }}: {{ appInfo?.releaseTime ?? $t('unknown.name') }}<br />
        {{ $t('id.name') }}: {{ appInfo?.id ?? $t('unknown.name') }}<br />
      </v-list-item>
    </v-skeleton-loader>
  </v-list>
</template>

<style scoped lang="scss"></style>
