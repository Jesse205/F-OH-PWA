<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import BackButton from '@/components/BackButton.vue'
import TitleList from '@/components/list/TitleList.vue'
import { useTitle } from '@/composables/title'
import { useAppsStore } from '@/store/apps'
import type { AppInfo } from '@/ts/interfaces/app.interfaces'
import { getAppShareUrl, getAppTags } from '@/util/apps'
import { matchUserSpace } from '@/util/url'
import { mdiFormatQuoteOpen } from '@mdi/js'
import { useScroll, useShare } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import AppDetails from './components/AppDetails.vue'
import AppOverview from './components/AppOverview.vue'

const { t } = useI18n()
const route = useRoute()
const appsStore = useAppsStore()

/**
 * 查找当前应用信息，自动根据路由查找
 */
const appInfo = computed((): AppInfo | undefined => {
  if (!appsStore.data) return undefined
  const pkg = route.params.pkg
  const id = Number(route.params.pkg)
  if (id) {
    return appsStore.data.find((item) => item.id === id)
  } else if (pkg) {
    return appsStore.data.find((item) => item.packageName === pkg)
  } else {
    return undefined
  }
})
const loading = computed(() => appsStore.loading)

/**
 * 分割后的标签列表
 */
const appTags = computed(() => appInfo.value && getAppTags(appInfo.value))

/**
 * 作者主页地址，根据开源地址猜测，数据**可能会获取失败，或者不准确**！
 */
const developerSpace = computed(() =>
  appInfo.value ? matchUserSpace(new URL(appInfo.value.openSourceAddress, location.href)) : null,
)

onMounted(() => {
  // 确保数据已经获取到或者正在获取中
  appsStore.ensureData()
})
appsStore.autoRefresh()

// 页面滚动，动态展示标题
const mainElement = ref<InstanceType<typeof AppMain>>()
const appOverviewElement = ref<InstanceType<typeof AppOverview>>()

const appNamePositionYBottom = computed(() => {
  const element = appOverviewElement.value?.appNameElement
  return element ? element.offsetTop + element.offsetHeight : 0
})

const { y: scrollY } = useScroll(computed(() => mainElement.value?.mainScroll))

/**
 * 如果应用的标题被遮挡，就在应用栏内显示应用的标题。
 *
 * `true` 为已被遮挡，`false` 为未被遮挡。
 */
const isTitleObscured = computed(() => scrollY.value > appNamePositionYBottom.value)

const title = computed(() => (appInfo.value ? `${appInfo.value.name} - ${t('app.view')}` : t('app.view')))

useTitle(title)

// 分享
const { share, isSupported: isShareSupported } = useShare()

/**
 * 使用 Web Share API 分享当前应用。
 */
function shareApp() {
  if (!appInfo.value?.packageName) return
  share({
    title: document.head.title,
    url: getAppShareUrl(appInfo.value?.packageName).href,
  })
}
</script>

<template>
  <v-app-bar class="app-bar">
    <back-button />
    <!-- 多标题动画展示 -->
    <v-app-bar-title class="title">
      <transition :name="isTitleObscured ? 'scroll-x-reverse-transition' : 'scroll-x-transition'">
        <span :key="isTitleObscured.toString()" class="title__item">
          {{ isTitleObscured ? appInfo?.name : $t('app.view') }}
        </span>
      </transition>
    </v-app-bar-title>
    <v-tooltip v-if="isShareSupported">
      <template #activator="{ props }">
        <v-btn :disabled="!appInfo" icon="$share" v-bind="props" :aria-label="$t('share.name')" @click="shareApp" />
      </template>
      <span>{{ $t('share.name') }}</span>
    </v-tooltip>
  </v-app-bar>
  <app-main ref="mainElement">
    <v-progress-linear v-show="appsStore.loading" color="primary" class="progress" indeterminate />
    <v-container class="container py-0">
      <AppOverview ref="appOverviewElement" :app-info="appInfo" :loading="loading" class="my-4" />

      <!-- #region 一句话介绍 -->
      <v-skeleton-loader
        v-if="loading"
        class="summary-skeleton"
        :class="{ loading: loading }"
        type="sentences"
        color="rgba(var(--v-theme-on-surface), 0.12)"
      />
      <v-card v-else-if="appInfo?.desc" class="summary-card" variant="tonal" flat :border="false" tag="article">
        <v-card-text>{{ appInfo.desc }}</v-card-text>
        <v-icon class="summary-card__icon" :icon="mdiFormatQuoteOpen" />
      </v-card>
      <!-- #endregion -->

      <!-- #region 应用标签 -->
      <v-skeleton-loader v-if="loading" class="tags-skeleton" type="chip@3" color="transparent" />
      <div v-else-if="appTags?.length" class="tags-group">
        <div v-for="item in appTags" :key="item" class="tags-group__item">
          <v-chip>{{ item }}</v-chip>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region 开发者信息 -->
      <title-list v-show="appInfo?.vender || loading" class="my-4" :title="$t('developer.name')" data-allow-drag>
        <v-skeleton-loader v-if="loading" type="avatar, text" color="transparent" />
        <!-- prepend-avatar="@/assets/images/icon.svg" -->
        <v-list-item
          v-else
          prepend-icon="$account"
          :lines="developerSpace ? 'two' : 'one'"
          :title="appInfo?.vender"
          :subtitle="developerSpace ?? undefined"
          append-icon="$next"
          :href="developerSpace ?? `https://cn.bing.com/search?q=${appInfo?.vender}`"
          target="_blank"
        />
      </title-list>
      <!-- #endregion -->

      <!-- 详情信息 -->
      <AppDetails class="my-4" :loading="loading" :app-info="appInfo" :title-class="['itemTitle']" />
    </v-container>
  </app-main>
</template>

<style scoped lang="scss">
.app-bar {
  .title {
    position: relative;
    top: 0;
    bottom: 0;
    height: 100%;

    &__item {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
    }
  }
}

.progress {
  position: absolute;
  top: initial !important;
}
.summary {
  &-skeleton {
    margin: 16px 0;
    margin-bottom: 8px;
    width: 100%;
    max-width: 600px;
    color: inherit !important;
    border-radius: 16px;
  }

  &-card {
    text-align: center;
    margin: 16px 0;
    margin-bottom: 8px;
    :deep(.v-card-text) {
      font-size: 1rem;
      min-height: 52px;
      padding-left: 48px;
      padding-right: 48px;
    }

    &__icon {
      position: absolute;
      left: 14px;
      top: 10px;
      font-size: 32px;
      opacity: 0.3;
    }

    @media (min-width: 600px) {
      width: fit-content;
    }
  }
}

//标签
.tags {
  &-skeleton {
    margin: 16px -4px;
    margin-top: 8px;

    :deep(.v-skeleton-loader__chip) {
      margin: 4px;
      max-width: 56px;
      height: 30px;
    }
  }
  &-group {
    display: flex;
    flex-wrap: wrap;
    margin: 16px -4px;
    margin-top: 8px;
    &__item {
      padding: 4px;
    }
  }
}
</style>
@/composables/title
