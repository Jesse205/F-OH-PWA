<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppsStore } from '@/store/apps'
import { getServerCompletePath } from '@/util/url'
import { URL_API } from '@/data/constants'
import { onMounted } from 'vue'
import AppMain from '@/components/AppMain.vue'
import { useScroll, useTitle as useVueUseTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { getAppTags } from '../../util/apps'

const { t } = useI18n()

const route = useRoute()

const appsStore = useAppsStore()

// 查找当前应用信息
const appInfo = computed(() => appsStore.data?.find((item) => item.id === +route.params.id))
const loading = computed(() => appsStore.loading)

//绝对路径图标链接
const appIconUrl = computed(() => appInfo.value && getServerCompletePath(appInfo.value.icon, URL_API))

// 绝对路径下载链接
const appDownloadUrl = computed(() => appInfo.value && getServerCompletePath(appInfo.value.hapUrl, URL_API))

//分割标签
const appTags = computed(() => appInfo.value && getAppTags(appInfo.value))

//确保数据已经获取到或者正在获取中
onMounted(() => {
  appsStore.ensureData()
})

const mainElement = ref()
const mainScrollElement = computed<HTMLElement | null>(() => mainElement.value?.mainScroll)
const appNameElement = ref<HTMLElement>()
const appNamePositionYBottom = computed(() => {
  if (appNameElement.value) {
    return appNameElement.value.offsetTop + appNameElement.value.offsetHeight
  }
  return 0
})

// 页面滚动
const { y: scrollY } = useScroll(mainScrollElement)

//如果标题被遮拦就在应用栏内显示标题
const isTitleShowName = computed(() => scrollY.value > appNamePositionYBottom.value)

const title = computed(() => {
  if (appInfo.value) return `${appInfo.value.name} - ${t('app.view')}`
  else return t('app.view')
})

useVueUseTitle(title, { titleTemplate: `%s - ${t('appName')}` })
</script>

<template>
  <v-app-bar flat border="b">
    <v-btn v-if="$router.options.history.state.back" icon="mdi-arrow-left" @click.stop="$router.back" />
    <v-app-bar-title class="appBarTitle">
      <transition :name="isTitleShowName ? 'scroll-x-reverse-transition' : 'scroll-x-transition'">
        <span class="appBarTitleItem" :key="`app-bar-title-span-${isTitleShowName}`">
          {{ isTitleShowName ? appInfo?.name : $t('app.view') }}
        </span>
      </transition>
    </v-app-bar-title>
  </v-app-bar>
  <app-main ref="mainElement">
    <v-progress-linear v-show="appsStore.loading" color="primary" class="progress" indeterminate />
    <v-container class="container py-2">
      <!-- 顶部介绍 -->
      <div class="header py-2">
        <!-- 图标 -->
        <v-skeleton-loader
          class="appIcon border rounded-lg"
          :class="{ loading: loading }"
          type="image"
          :loading="loading"
        >
          <v-img class="border rounded-lg" :src="appIconUrl || ''" @dragstart.stop />
        </v-skeleton-loader>
        <div class="header-right ml-4">
          <!-- 应用名和版本 -->
          <v-skeleton-loader v-if="loading" class="appInfoSkeleton" type="text@2" color="transparent" />
          <template v-else>
            <div class="appTitle">
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
              prepend-icon="mdi-source-branch"
              v-if="appInfo?.openSourceAddress"
              variant="text"
              :href="appInfo.openSourceAddress"
              target="_blank"
              >{{ $t('source.code') }}
            </v-btn>
          </div>
        </div>
      </div>
      <!-- 一句话介绍 -->
      <div class="py-2" v-show="appInfo?.desc || loading">
        <v-skeleton-loader
          class="summarySkeleton rounded-lg"
          :class="{ loading: loading }"
          type="sentences"
          color="rgba(var(--v-theme-on-surface),0.06)"
          :loading="loading"
        >
          <v-card class="text-center" variant="tonal" :border="false" tag="article">
            <v-card-text>{{ appInfo?.desc }}</v-card-text>
            <v-icon icon="mdi-format-quote-open" />
          </v-card>
        </v-skeleton-loader>
      </div>
      <v-skeleton-loader v-if="loading" class="tagsSkeleton" type="chip@2" color="transparent" />
      <div v-else-if="appTags?.length" class="tagsGroup">
        <div class="tagItem" v-for="item in appTags">
          <v-chip variant="text" border>{{ item }}</v-chip>
        </div>
      </div>
      <!-- 开发者信息 -->
      <div v-show="appInfo?.vender || loading" class="py-2" @dragstart.stop>
        <h2 class="itemTitle">{{ $t('developer.name') }}</h2>
        <v-skeleton-loader type="avatar, text" color="transparent" :loading="loading">
          <v-list-item
            prepend-avatar="@/assets/images/icon.svg"
            rounded="lg"
            lines="two"
            :title="appInfo?.vender"
            link
            append-icon="mdi-chevron-right"
            :href="`https://cn.bing.com/search?q=${appInfo?.vender}`"
            target="_blank"
            width="100%"
          />
        </v-skeleton-loader>
      </div>
      <!-- 详情信息 -->
      <div class="py-2">
        <h2 class="itemTitle">{{ $t('details.name') }}</h2>
        <v-skeleton-loader v-if="loading" class="detailsSkeleton" type="text@5" color="transparent" />
        <template v-else>
          {{ $t('version.name') }}: {{ appInfo?.version ?? $t('unknown.name') }}<br />
          {{ $t('packageName.name') }}: {{ appInfo?.packageName ?? $t('unknown.name') }}<br />
          {{ $t('developer.name') }}: {{ appInfo?.vender ?? $t('unknown.name') }}<br />
          {{ $t('release.name') }}: {{ appInfo?.releaseTime ?? $t('unknown.name') }}<br />
          {{ $t('id.name') }}: {{ appInfo?.id ?? $t('unknown.name') }}<br />
        </template>
      </div>
    </v-container>
  </app-main>
</template>

<style scoped lang="scss">
.appBarTitle {
  position: relative;
  top: 0;
  bottom: 0;
  height: 100%;
  // min-height: 1.75rem; // aka line height

  .appBarTitleItem {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
}

.progress {
  position: absolute;
  top: initial !important;
}

.header {
  display: flex;
  width: 100%;
  align-items: flex-start;
  .appIcon {
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
    .appTitle {
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

.itemTitle {
  color: rgba(var(--v-theme-on-background));
  font-size: 1.125rem;
  margin-bottom: 8px;
  font-weight: 500;
}

//标签
.tagsSkeleton {
  margin: -4px;

  :deep(.v-skeleton-loader__chip) {
    margin: 4px;
    max-width: 56px;
    height: 30px;
  }
}

.tagsGroup {
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  .tagItem {
    padding: 4px;
  }
}

.summarySkeleton {
  width: 100%;
  max-width: 600px;
  color: inherit !important;

  :deep(.v-card__underlay) {
    opacity: 0.06;
  }

  :deep(.v-card-text) {
    font-size: 1rem;
    min-height: 52px;
    padding-left: 48px;
    padding-right: 48px;
  }

  :deep(.v-icon) {
    position: absolute;
    left: 14px;
    top: 10px;
    font-size: 32px;
    opacity: 0.3;
  }

  @media (min-width: 600px) {
    width: fit-content;
  }
  &.loading {
    width: 100%;
  }
}

.detailsSkeleton {
  margin: -16px;
}
</style>
