<script setup lang="ts">
import BackButton from '@/components/appbar/BackButton.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import { useTitle } from '@/composables/title'
import type { AppInfo } from '@/data/apps'
import { useAppsStore } from '@/store/apps'
import { getAppShareUrl } from '@/utils/apps'
import { useVMainScroller } from '@/utils/element'
import { matchUserSpace } from '@/utils/url'
import { mdiFormatQuoteOpen } from '@mdi/js'
import { useIntersectionObserver, useShare } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { VMain } from 'vuetify/components'
import AppDetails from './components/AppDetails.vue'
import AppOverview from './components/AppOverview.vue'

const { t } = useI18n()
const route = useRoute()
const appsStore = useAppsStore()

/**
 * 查找当前应用信息，自动根据路由查找
 */
const appInfo = computed((): AppInfo | undefined => {
  if (!appsStore.apps) return undefined
  const pkg = route.params.pkg
  const id = Number(pkg)
  if (id) {
    return appsStore.apps.find((item) => item.id === id)
  } else if (pkg) {
    return appsStore.apps.find((item) => item.packageName === pkg)
  } else {
    return undefined
  }
})
const isLoading = computed(() => appsStore.isLoading)

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

// 页面滚动，动态展示标题
const appBarTitleMode = ref<'page-title' | 'app-title'>('page-title')
const appOverviewComponent = ref<InstanceType<typeof AppOverview>>()
const mainComponent = ref<InstanceType<typeof VMain>>()

useIntersectionObserver(
  computed(() => appOverviewComponent.value?.appNameElement),
  ([{ isIntersecting }]) => {
    appBarTitleMode.value = isIntersecting ? 'page-title' : 'app-title'
  },
  {
    root: useVMainScroller(mainComponent),
  },
)

useTitle(computed(() => (appInfo.value ? `${appInfo.value.name} - ${t('viewApp')}` : t('viewApp'))))

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
  <v-layout>
    <v-app-bar class="app-bar">
      <back-button />
      <!-- 多标题动画展示 -->
      <v-app-bar-title class="title">
        <transition :name="appBarTitleMode === 'app-title' ? 'scroll-x-reverse-transition' : 'scroll-x-transition'">
          <div :key="appBarTitleMode" class="title__item">
            {{ appBarTitleMode === 'app-title' ? appInfo?.name : $t('viewApp') }}
          </div>
        </transition>
      </v-app-bar-title>
      <v-btn
        v-if="isShareSupported"
        v-tooltip="$t('action.share')"
        :disabled="!appInfo"
        icon="$share"
        :aria-label="$t('action.share')"
        @click="shareApp"
      />
    </v-app-bar>
    <v-main ref="mainComponent">
      <v-progress-linear v-if="isLoading" color="primary" class="progress" indeterminate />
      <AppOverview ref="appOverviewComponent" class="ma-4" :app-info="appInfo" :loading="isLoading" />

      <!-- #region 一句话介绍 -->
      <v-skeleton-loader
        v-if="isLoading"
        class="summary-skeleton"
        :class="{ loading: isLoading }"
        type="sentences"
        color="rgba(var(--v-theme-on-surface), var(--v-activated-opacity))"
      />
      <v-card v-else-if="appInfo?.desc" class="summary-card" variant="tonal" flat :border="false" tag="article">
        <v-card-text>{{ appInfo.desc }}</v-card-text>
        <v-icon class="summary-card__icon" :icon="mdiFormatQuoteOpen" />
      </v-card>
      <!-- #endregion -->

      <!-- #region 应用标签 -->
      <v-skeleton-loader v-if="isLoading" class="tags-skeleton" type="chip@3" color="transparent" />
      <div v-else-if="appInfo?.tags?.length" class="tags-group">
        <v-chip v-for="item in appInfo?.tags" :key="item" class="tags-group__item">{{ item }}</v-chip>
      </div>
      <!-- #endregion -->
      <app-category-list class="ma-4">
        <!-- #region 开发者信息 -->
        <app-list-category v-show="appInfo?.vender || isLoading" :subheader="$t('developer.title')" data-allow-drag>
          <v-skeleton-loader
            v-if="isLoading"
            class="skeleton--small-avatar"
            type="list-item-avatar-two-line"
            color="transparent"
          />
          <v-list-item
            v-else
            prepend-icon="$developer"
            :lines="developerSpace ? 'two' : 'one'"
            :title="appInfo?.vender"
            :subtitle="developerSpace ?? undefined"
            append-icon="$openInNew"
            :href="developerSpace ?? `https://cn.bing.com/search?q=${appInfo?.vender}`"
            target="_blank"
          />
        </app-list-category>
        <!-- #endregion -->

        <!-- 详情信息 -->
        <AppDetails :loading="isLoading" :app-info="appInfo" :title-class="['itemTitle']" />
      </app-category-list>
    </v-main>
  </v-layout>
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

.summary-skeleton {
  margin: 16px;
  margin-bottom: 8px;
  max-width: 600px;
  color: inherit !important;
  border-radius: 16px;
}

.summary-card {
  margin: 16px;
  margin-bottom: 8px;
  :deep(.v-card-text) {
    font-size: 1rem;
    min-height: 52px;
    padding-left: 48px;
    padding-right: 48px;
    user-select: text;
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

//标签
.tags-skeleton {
  margin: 16px 12px;
  margin-top: 8px;

  :deep(.v-skeleton-loader__chip) {
    margin: 4px;
    width: 56px;
    height: 30px;
    flex-grow: 0;
    flex-basis: auto;
  }
}

.tags-group {
  display: flex;
  flex-wrap: wrap;
  margin: 16px 12px;
  margin-top: 8px;
  user-select: text;
  &__item {
    margin: 4px;
  }
}
</style>
