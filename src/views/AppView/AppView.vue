<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppsStore } from '@/store/apps'
import { onMounted } from 'vue'
import AppMain from '@/components/AppMain.vue'
import { useScroll, useShare } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { getAppTags } from '@/util/apps'
import { useTitle } from '@/events/title'
import AppOverview from './components/AppOverview.vue'
import AppDetails from './components/AppDetails.vue'
import BackButton from '@/components/BackButton.vue'
import { isLegacyApp } from '@/util/app'
import { HOST_WEB } from '@/data/constants'

const { t } = useI18n()

const route = useRoute()

const appsStore = useAppsStore()

// 查找当前应用信息
const appInfo = computed(() => appsStore.data?.find((item) => item.id === Number(route.params.id)))
const loading = computed(() => appsStore.loading)

// 分割标签
const appTags = computed(() => appInfo.value && getAppTags(appInfo.value))

// 确保数据已经获取到或者正在获取中
onMounted(() => {
  appsStore.ensureData()
})

const mainElement = ref<InstanceType<typeof AppMain>>()
const appOverviewElement = ref<InstanceType<typeof AppOverview>>()

const mainScrollElement = computed<HTMLElement | null>(() => mainElement.value?.mainScroll ?? null)
const appNameElement = computed(() => appOverviewElement.value?.appNameElement)

const appNamePositionYBottom = computed(() => {
  const element = appNameElement.value
  return element ? element.offsetTop + element.offsetHeight : 0
})

// 页面滚动
const { y: scrollY } = useScroll(mainScrollElement)

// 如果标题被遮拦就在应用栏内显示标题
const isTitleShowName = computed(() => scrollY.value > appNamePositionYBottom.value)

const title = computed(() => (appInfo.value ? `${appInfo.value.name} - ${t('app.view')}` : t('app.view')))

useTitle(title)

// 分享
const { share, isSupported: isShareSupported } = useShare()

function getAppShareUrl(): URL {
  const url = new URL(location.href)
  if (isLegacyApp()) {
    url.hostname = HOST_WEB
    url.protocol = 'https'
    url.port = ''
  }
  return url
}
function shareApp() {
  share({
    title: document.head.title,
    url: getAppShareUrl().href,
  })
}
</script>

<template>
  <v-app-bar class="app-bar">
    <back-button />
    <!-- 多标题动画展示 -->
    <v-app-bar-title class="title">
      <transition :name="isTitleShowName ? 'scroll-x-reverse-transition' : 'scroll-x-transition'">
        <span :key="isTitleShowName.toString()" class="title-item">
          {{ isTitleShowName ? appInfo?.name : $t('app.view') }}
        </span>
      </transition>
    </v-app-bar-title>
    <v-tooltip v-if="isShareSupported" location="bottom">
      <template v-slot:activator="{ props }">
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
      <div v-show="appInfo?.desc || loading" class="my-4">
        <v-skeleton-loader
          v-if="loading"
          class="summarySkeleton"
          :class="{ loading: loading }"
          type="sentences"
          color="rgba(var(--v-theme-on-surface), 0.12)"
        />
        <v-card v-else class="summaryCard" variant="tonal" flat :border="false" tag="article">
          <v-card-text>{{ appInfo?.desc }}</v-card-text>
          <v-icon class="icon" icon="mdi-format-quote-open" />
        </v-card>
      </div>
      <!-- #endregion -->

      <!-- #region 应用标签 -->
      <v-skeleton-loader v-if="loading" class="tagsSkeleton" type="chip@3" color="transparent" />
      <div v-else-if="appTags?.length" class="tagsGroup">
        <div v-for="item in appTags" :key="item" class="tagItem">
          <v-chip>{{ item }}</v-chip>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region 开发者信息 -->
      <v-list v-show="appInfo?.vender || loading" class="my-4" @dragstart.stop>
        <v-list-subheader>{{ $t('developer.name') }}</v-list-subheader>
        <v-skeleton-loader type="avatar, text" color="transparent" :loading="loading">
          <!-- prepend-avatar="@/assets/images/icon.svg" -->
          <v-list-item
            prepend-icon="$account"
            lines="two"
            :title="appInfo?.vender"
            link
            append-icon="$next"
            :href="`https://cn.bing.com/search?q=${appInfo?.vender}`"
            target="_blank"
            width="100%"
          />
        </v-skeleton-loader>
      </v-list>
      <!-- #endregion -->

      <!-- 详情信息 -->
      <AppDetails :loading="loading" :app-info="appInfo" :title-class="['itemTitle']" />
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

    .title-item {
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

//标签
.tagsSkeleton {
  margin: -4px;
  margin-top: -12px;

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
  margin-top: -12px;
  .tagItem {
    padding: 4px;
  }
}

.summarySkeleton {
  width: 100%;
  max-width: 600px;
  color: inherit !important;
  border-radius: 16px;
}

.summaryCard {
  text-align: center;

  :deep(.v-card-text) {
    font-size: 1rem;
    min-height: 52px;
    padding-left: 48px;
    padding-right: 48px;
  }

  .icon {
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
</style>
