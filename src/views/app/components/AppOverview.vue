<script setup lang="ts">
import type { AppInfo } from '@/ts/interfaces/app.interfaces'
import { getApiUrl, getServerCompletePath } from '@/util/url'
import { mdiSourceBranch } from '@mdi/js'
import { computed, ref } from 'vue'

const props = defineProps<{
  loading: boolean
  appInfo?: AppInfo
}>()

// 绝对路径图标链接
const appIconUrl = computed(() => props.appInfo && getServerCompletePath(props.appInfo.icon))

// 绝对路径下载链接
const appDownloadUrl = computed(() => {
  if (props.appInfo) return getServerCompletePath(props.appInfo.hapUrl, getApiUrl(true))
  return null
})

const appNameElement = ref<HTMLElement>()

defineExpose({
  appNameElement,
})
</script>

<template>
  <div class="app-overview">
    <!-- 图标 -->
    <v-skeleton-loader
      class="app-overview__icon border rounded-lg"
      :class="{ loading: loading }"
      type="image"
      :loading="loading"
    >
      <v-img class="rounded-lg" :src="appIconUrl ?? ''" data-allow-drag />
    </v-skeleton-loader>
    <div class="app-overview__right">
      <!-- 应用名和版本 -->
      <v-skeleton-loader v-if="loading" class="app-overview__right__skeleton" type="text@2" color="transparent" />
      <template v-else>
        <h2 class="app-overview__right__title text-h6">
          <!-- 应用名 -->
          <span ref="appNameElement" :title="$t('app.name')">{{ appInfo?.name }}</span>
          <span class="text-subtitle-2" :title="$t('version.name')">
            v{{ appInfo ? `${appInfo.version}` : $t('unknown.name') }}
          </span>
        </h2>
        <div class="app-overview__right__package-name text-subtitle-2" :title="$t('packageName.name')">
          {{ appInfo?.packageName ?? $t('unknown.name') }}
        </div>
      </template>
      <div class="app-overview__right__button-group" data-allow-drag>
        <!-- 下载按钮 -->
        <v-btn
          prepend-icon="$downloadFilled"
          variant="flat"
          :disabled="!appDownloadUrl"
          :href="appDownloadUrl || undefined"
          target="_blank"
          >{{ $t('download.name') }}
        </v-btn>
        <!-- 源代码按钮 -->
        <v-btn
          v-if="appInfo?.openSourceAddress"
          :prepend-icon="mdiSourceBranch"
          variant="text"
          :href="appInfo.openSourceAddress"
          target="_blank"
          >{{ $t('source.code') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-overview {
  display: flex;
  width: 100%;
  align-items: flex-start;
  &__icon {
    width: 96px;
    height: 96px;
    overflow: hidden;
    flex-shrink: 0;

    :deep(.v-skeleton-loader__image) {
      height: 100%;
      width: 100%;
    }
    // TODO: 当 F-OH 支持自适应图标后移除这项
    border-radius: 24% !important;
  }
  &__right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-wrap: nowrap;
    width: 0;
    margin-left: 16px;

    &__skeleton {
      margin: -2px -16px;
      overflow: hidden;
    }
    &__title {
      overflow: hidden;
    }

    .text-subtitle-2 {
      opacity: var(--v-medium-emphasis-opacity);
    }

    &__package-name {
      overflow: hidden;
      height: 1.75rem;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__button-group {
      flex-wrap: wrap;
      margin: -4px;
      display: flex;

      > * {
        margin: 4px;
      }
    }
  }
}
</style>
