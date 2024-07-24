<script setup lang="ts">
import type { AppInfo } from '@/utils/apps'
import { completeApiUrl, currentOriginApiUrl } from '@/utils/url'
import { mdiSourceBranch } from '@mdi/js'
import { computed, ref } from 'vue'

const props = defineProps<{
  loading: boolean
  appInfo?: AppInfo
}>()

// 绝对路径图标链接
const appIconUrl = computed(() => props.appInfo && completeApiUrl(props.appInfo.icon))

// 绝对路径下载链接
const appDownloadUrl = computed(() => {
  if (props.appInfo) return completeApiUrl(props.appInfo.hapUrl, currentOriginApiUrl)
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
    <v-skeleton-loader v-if="loading" class="ohos-app-icon app-icon-skeleton" type="image" color="transparent" />
    <v-img v-else class="ohos-app-icon app-icon border" :src="appIconUrl" data-allow-drag />
    <div class="app-overview__right">
      <!-- 应用名和版本 -->
      <v-skeleton-loader v-if="loading" class="app-overview__right__skeleton" type="text@2" color="transparent" />
      <template v-else>
        <h2 class="app-title text-h6">
          <!-- 应用名 -->
          <span ref="appNameElement" class="app-title__name" :title="$t('appName.title')">{{ appInfo?.name }}</span>
          <span class="app-title__version text-subtitle-2" :title="$t('version.app')">
            {{ appInfo ? `v${appInfo.version}` : $t('unknown.version') }}
          </span>
        </h2>
        <div class="app-title__package text-subtitle-2" :title="$t('packageName')">
          {{ appInfo?.packageName ?? $t('unknown.packageName') }}
        </div>
      </template>
      <div class="button-group" data-allow-drag>
        <!-- 下载按钮 -->
        <v-btn
          prepend-icon="$downloadFilled"
          variant="flat"
          :disabled="!appDownloadUrl"
          :href="appDownloadUrl || undefined"
          target="_blank"
          >{{ $t('action.download') }}
        </v-btn>
        <!-- 源代码按钮 -->
        <v-btn
          v-if="appInfo?.openSourceAddress"
          :prepend-icon="mdiSourceBranch"
          variant="text"
          :href="appInfo.openSourceAddress"
          target="_blank"
          >{{ $t('sourceCode') }}
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

    .button-group {
      flex-wrap: wrap;
      margin: -4px;
      margin-top: 0;
      display: flex;

      > * {
        margin: 4px;
      }
    }
  }
}

.app-icon {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  flex-grow: 0;
}
.app-icon-skeleton {
  width: 96px;
  height: 96px;
  overflow: hidden;
  flex-shrink: 0;
  :deep(.v-skeleton-loader__image) {
    height: 100%;
    width: 100%;
  }
}
.app-title {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: -4px;
  > * {
    margin: 4px;
  }
  &__name {
    overflow: hidden;
  }

  &__version,
  &__package {
    overflow: hidden;
    // height: 1.75rem;
    text-overflow: ellipsis;
    opacity: var(--v-medium-emphasis-opacity);
  }
}
.app-name {
  overflow: hidden;
}
</style>
