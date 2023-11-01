<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppsStore } from '@/store/apps'
import { onMounted } from 'vue'
import AppMain from '@/components/AppMain.vue'
import { useScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { getAppTags } from '@/util/apps'
import { useTitle } from '@/events/title'
import AppOverview from './components/AppOverview.vue'
import AppDetails from './components/AppDetails.vue'
import BackButton from '@/components/BackButton.vue'

const { t } = useI18n()

const route = useRoute()

const appsStore = useAppsStore()

// 查找当前应用信息
const appInfo = computed(() => appsStore.data?.find((item) => item.id === +route.params.id))
const loading = computed(() => appsStore.loading)

//分割标签
const appTags = computed(() => appInfo.value && getAppTags(appInfo.value))

//确保数据已经获取到或者正在获取中
onMounted(() => {
  appsStore.ensureData()
})

const mainElement = ref<InstanceType<typeof AppMain>>()
const mainScrollElement = computed<HTMLElement | null>(() => mainElement.value?.mainScroll ?? null)

const AppOverviewElement = ref<InstanceType<typeof AppOverview>>()

const appNameElement = computed(() => AppOverviewElement.value?.appNameElement)

const appNamePositionYBottom = computed(() => {
  const element = appNameElement.value
  return element ? element.offsetTop + element.offsetHeight : 0
})

// 页面滚动
const { y: scrollY } = useScroll(mainScrollElement)

//如果标题被遮拦就在应用栏内显示标题
const isTitleShowName = computed(() => scrollY.value > appNamePositionYBottom.value)

const title = computed(() => (appInfo.value ? `${appInfo.value.name} - ${t('app.view')}` : t('app.view')))

useTitle(title)
</script>

<template>
  <v-app-bar class="app-bar" flat border="b">
    <back-button />
    <!-- 多标题动画展示 -->
    <v-app-bar-title class="title">
      <transition :name="isTitleShowName ? 'scroll-x-reverse-transition' : 'scroll-x-transition'">
        <span class="title-item" :key="isTitleShowName.toString()">
          {{ isTitleShowName ? appInfo?.name : $t('app.view') }}
        </span>
      </transition>
    </v-app-bar-title>
  </v-app-bar>
  <app-main ref="mainElement">
    <v-progress-linear v-show="appsStore.loading" color="primary" class="progress" indeterminate />
    <v-container class="container py-2">
      <AppOverview ref="AppOverviewElement" :app-info="appInfo" :loading="loading" class="py-2" />

      <!-- #region 一句话介绍 -->
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
      <!-- #endregion -->

      <!-- #region 应用标签 -->
      <v-skeleton-loader v-if="loading" class="tagsSkeleton" type="chip@2" color="transparent" />
      <div v-else-if="appTags?.length" class="tagsGroup">
        <div class="tagItem" v-for="item in appTags">
          <v-chip variant="text" border>{{ item }}</v-chip>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region 开发者信息 -->
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
      <!-- #endregion -->

      <!-- 详情信息 -->
      <div class="py-2">
        <h2 class="itemTitle">{{ $t('details.name') }}</h2>
        <AppDetails :loading="loading" :app-info="appInfo" :title-class="['itemTitle']" />
      </div>
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
