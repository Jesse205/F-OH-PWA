<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useTitle } from '@/composables/title'
import { URL_UPLOAD } from '@/data/constants'
import type { NavPage } from '@/composables/navigation'
import { useHomeNavigation } from '@/composables/navigation'
import BackButton from '@/components/BackButton.vue'
import type MainHomeView from './MainHomeView.vue'
import type MainCategoriesView from './MainCategoriesView.vue'
import type MainMeView from './MainMeView.vue'
import type MainUpdateView from './MainUpdateView.vue'
import { usePwaStore } from '@/store/pwa'
import { useRouter, useRoute } from 'vue-router'
import { PATH_HOME } from '@/router'

const { pages, activePagePosition, isBackOtherPage, isInMainView } = useHomeNavigation()

const currentPage = ref<NavPage | null>(null)

watchEffect(() => {
  if (activePagePosition.value !== null) {
    currentPage.value = pages.value[activePagePosition.value]
  } else {
    currentPage.value = null
  }
})

useTitle(computed(() => currentPage.value?.title ?? ''))

const { xs } = useDisplay()
const router = useRouter()
const route = useRoute()

/**
 * - 当设备为大屏时，首页隐藏按钮，其他页面显示按钮，这是通用逻辑，所以大屏设备始终为 `true`。
 * - 当设备为小屏时，始终隐藏按钮。
 * - 例外情况：首页但是有历史记录，始终显示按钮。
 */
const isBackButtonShowing = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  route.path // 确保路由刷新时重新调用该函数
  const { back } = router.options.history.state
  return (back && back !== PATH_HOME) || !xs.value
})

// PWA
const pwaStore = usePwaStore()

type HomeComponent = InstanceType<
  typeof MainHomeView | typeof MainCategoriesView | typeof MainUpdateView | typeof MainMeView
>
const routeComponent = ref<HomeComponent>()

/**
 * 刷新当前页面的数据
 */
function refresh() {
  const component = routeComponent.value
  if (component && 'refresh' in component) {
    component.refresh()
  }
}
</script>

<template>
  <!-- 应用栏 -->
  <v-app-bar>
    <!-- 仅在非手机中显示返回按钮 -->
    <back-button v-if="isBackButtonShowing" />
    <v-app-bar-title>{{ currentPage?.title }}</v-app-bar-title>
    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="$search" v-bind="props" disabled aria-label="搜索应用" />
      </template>
      <span>搜索应用</span>
    </v-tooltip>
    <v-menu origin="bottom" width="172" location="top" scrim="transparent">
      <template v-slot:activator="{ props: menu }">
        <v-btn icon="$more" v-bind="menu" />
      </template>
      <v-list>
        <!-- TODO: 使用Upload页面 -->
        <!-- <v-list-item :title="$t('upload.app')" :to="{ name: 'Upload' }" /> -->
        <v-list-item v-if="currentPage?.refreshable" :title="$t('refresh.name')" @click="refresh" />
        <v-list-item :title="$t('upload.app')" :href="URL_UPLOAD" target="_blank" />
        <v-list-item v-if="pwaStore.installBtnVisible" :title="$t('install.app')" @click="pwaStore.onInstallBtnClick" />
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- 主视图 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" ref="routeComponent" />
    </keep-alive>
  </router-view>

  <!-- 底部导航栏 -->
  <v-bottom-navigation v-if="xs">
    <v-btn
      v-for="item in pages"
      :key="item.name"
      :to="{ name: item.name }"
      :disabled="item.disabled"
      :replace="isInMainView && (activePagePosition !== 0 || isBackOtherPage)"
    >
      <v-icon>{{ $route.name === item.name ? item.activeIcon : item.icon }}</v-icon>
      {{ item.title }}
    </v-btn>
  </v-bottom-navigation>
</template>

<!-- <style scoped></style> -->
