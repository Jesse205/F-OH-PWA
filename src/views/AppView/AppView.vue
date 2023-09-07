<script setup lang="ts">
import { ref, computed, onActivated } from 'vue'
import { useTitle } from "@/events/title"
import { useRoute } from 'vue-router'
import { useAppsStore } from '@/store/apps'
import { getServerCompletePath } from '@/util/url'
import { URL_API } from '@/data/constants'
import { onMounted } from 'vue'
import AppMain from '@/components/AppMain.vue'
import { useScroll, useTitle as useVueUseTitle } from '@vueuse/core';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()

const appsStore = useAppsStore()

const appInfo = computed(() => {
  return appsStore.data?.find((item) => {
    return item.id === +route.params.id
  })
})

const appIconUrl = computed(() => {
  if (appInfo.value)
    return getServerCompletePath(appInfo.value.icon, URL_API)
  return null
})

const appDownloadUrl = computed(() => {
  if (appInfo.value)
    return getServerCompletePath(appInfo.value.hapUrl, URL_API)
  return null
})

//分割标签
const appTags = computed(() => {
  if (appInfo.value)
    return appInfo.value.tags.split(/[, ，]+/)
  return null
})

//确保数据已经获取到或者正在获取中
onMounted(() => {
  appsStore.ensureData()
})

const mainElement = ref()
const mainScrollElement = computed(() => {
  return mainElement.value?.mainScroll
})
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
const isTitleAppName = computed(() => scrollY.value > appNamePositionYBottom.value)

const title = computed(() => {
  if (appInfo.value)
    return `${appInfo.value.name} - ${t('app.view')}`
  else
    return t('app.view')
})

useVueUseTitle(title, { titleTemplate: `%s - ${t('appName')}` })

</script>

<template>
  <v-app-bar flat border="b">
    <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
    <v-app-bar-title class="appBarTitle">
      <transition :name="isTitleAppName ? 'scroll-x-reverse-transition' : 'scroll-x-transition'">
        <span class="appBarTitleItem" :key="'app-bar-title-span' + isTitleAppName">{{ isTitleAppName ? appInfo?.name :
          $t('app.view') }}</span>
      </transition>
    </v-app-bar-title>
  </v-app-bar>
  <app-main ref="mainElement">
    <v-progress-linear v-show="appsStore.loading" color="primary" class="progress" indeterminate />
    <v-container class="container py-2">
      <!-- 顶部介绍 -->
      <div class="header py-2">
        <!-- 图标 -->
        <v-img class="elevation-1 rounded-lg" :src="appIconUrl || ''" width="96" height="96" />
        <div class="header-right ml-4">
          <!-- 应用名 -->
          <div class="text-h6" ref="appNameElement">{{ appInfo?.name }}</div>
          <!-- 版本 -->
          <div class="text-subtitle-1">
            v{{ appInfo ? `${appInfo.version}` : $t('unknown.name') }}</div>
          <div class="buttonGroup">
            <v-btn variant="flat" :disabled="!appDownloadUrl" :href="appDownloadUrl || undefined" target="_blank">{{
              $t('download.name') }}</v-btn>
            <v-btn v-if="appInfo?.openSourceAddress" variant="text" :href="appInfo.openSourceAddress" target="_blank">{{
              $t('source.code') }}</v-btn>
          </div>
        </div>
      </div>
      <!-- 一句话介绍 -->
      <div class="py-2">
        <v-card v-show="appInfo?.desc" class="text-center summaryCard" variant="tonal" :border="false">
          <v-card-text>{{ appInfo?.desc }}</v-card-text>
          <v-icon icon="mdi-format-quote-open" />
        </v-card>
      </div>
      <div class="tagsGroup">
        <div v-for="item in appTags">
          <v-chip variant="text" border>{{ item }}</v-chip>
        </div>
      </div>
      <!-- 开发者信息 -->
      <div v-show="appInfo?.vender" class="py-2">
        <div class="title">开发者</div>
        <v-list-item rounded="lg" lines="two" :title="appInfo?.vender" link append-icon="mdi-chevron-right"
          :href="`https://cn.bing.com/search?q=${appInfo?.vender}`" target="_blank">
          <template v-slot:prepend>
            <v-avatar class="border" size="40">
              <v-img src="@/assets/images/icon.svg" />
            </v-avatar>
          </template>
        </v-list-item>
      </div>
      <!-- 详情信息 -->
      <div class="py-2">
        <div class="title">{{ $t('details.name') }}</div>
        {{ $t('version.name') }}: {{ appInfo?.version || $t('unknown.name') }}<br />
        {{ $t('packageName.name') }}: {{ appInfo?.packageName || $t('unknown.name') }}<br />
        {{ $t('developer.name') }}: {{ appInfo?.vender || $t('unknown.name') }}<br />
        {{ $t('release.name') }}: {{ appInfo?.releaseTime || $t('unknown.name') }}<br />
        <!-- 存在ID为0的情况，因此不能通过 || 直接判断是否获取到ID -->
        {{ $t('id.name') }}: {{ appInfo ? appInfo.id : $t('unknown.name') }}<br />
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
  align-items: center;
}

.header-right {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.header-right>.text-h6 {
  height: 2rem
}

.header-right>.text-subtitle-1 {
  height: 1.75rem;
  opacity: 0.62;
}

.buttonGroup {
  :deep(.v-btn):not(:last-child) {
    margin-right: 8px;
  }
}

.title {
  color: rgba(var(--v-theme-on-background));
  font-size: 1.125rem;
  margin-bottom: 8px;
  font-weight: 500;
}

.tagsGroup {
  display: flex;
  flex-wrap: wrap;
  margin: -4px;

  * {
    padding: 4px;
  }
}

.summaryCard {
  width: 100%;

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
}
</style>
