<script setup lang="ts">
import { URL_API } from '@/data/constants'
import { AppInfo } from '@/ts/interfaces/app.interfaces'
import { getServerCompletePath } from '@/util/url'
import { computed, ref } from 'vue'
const props = defineProps<{
  loading: boolean
  appInfo?: AppInfo
}>()

//绝对路径图标链接
const appIconUrl = computed(() => props.appInfo && getServerCompletePath(props.appInfo.icon, URL_API))

// 绝对路径下载链接
const appDownloadUrl = computed(() => props.appInfo && getServerCompletePath(props.appInfo.hapUrl, URL_API))

const appNameElement = ref<HTMLElement>()

defineExpose({
  appNameElement
})
</script>

<template>
  <div class="app-overview">
    <!-- 图标 -->
    <v-skeleton-loader class="app-icon border rounded-lg" :class="{ loading: loading }" type="image" :loading="loading">
      <v-img class="rounded-lg" :src="appIconUrl ?? ''" @dragstart.stop />
    </v-skeleton-loader>
    <div class="header-right ml-4">
      <!-- 应用名和版本 -->
      <v-skeleton-loader v-if="loading" class="appInfoSkeleton" type="text@2" color="transparent" />
      <template v-else>
        <div class="app-title">
          <!-- 应用名 -->
          <h1 class="text-h6" ref="appNameElement" :title="$t('app.name')">{{ appInfo?.name }}</h1>
          <span class="text-subtitle-2" :title="$t('version.name')">
            v{{ appInfo ? `${appInfo.version}` : $t('unknown.name') }}
          </span>
        </div>
        <div class="packageName text-subtitle-2" :title="$t('packageName.name')">
          {{ appInfo?.packageName ?? $t('unknown.name') }}
        </div>
      </template>
      <div class="buttonGroup" @dragstart.stop>
        <!-- 下载按钮 -->
        <v-btn
          prepend-icon="mdi-download"
          variant="flat"
          :disabled="!appDownloadUrl"
          :href="appDownloadUrl || undefined"
          target="_blank"
          >{{ $t('download.name') }}
        </v-btn>
        <!-- 源代码按钮 -->
        <v-btn
          v-if="appInfo?.openSourceAddress"
          prepend-icon="mdi-source-branch"
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
  .app-icon {
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

  .header-right {
    display: flex;
    flex-direction: column;
    width: max-content;
    flex-wrap: nowrap;
    overflow: hidden;

    .appInfoSkeleton {
      margin: -2px -16px;
      overflow: hidden;
    }
    .app-title {
      > * {
        display: inline;
      }
    }

    .text-subtitle-2 {
      opacity: var(--v-medium-emphasis-opacity);
    }

    .packageName {
      height: 1.75rem;
    }

    .buttonGroup {
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
