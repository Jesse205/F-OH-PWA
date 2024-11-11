<script lang="ts" setup>
import { usePreferredDark, useTitle as useDocumentTitle } from '@vueuse/core'
import { computed, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useTheme } from 'vuetify'

import NavigationDrawer from '@/components/app/NavigationDrawer.vue'
import PwaComponent from '@/components/app/PwaComponent.vue'
import TauriSystemBar from '@/components/app/TauriSystemBar.vue'
import { useAutoLocale, useAutoTheme, useMetaThemeColor } from '@/composables/app'
import SplashView from '@/pages/splash/SplashView.vue'
import { usePageTransition, usePreferredLocale } from '@/preferences/ui'
import { useGlobalStore } from '@/store/global'
import { currentDesign, currentDesignConfig } from '@/themes'
import { isElementDraggableInClientApp } from '@/utils/drag'
import { isTauriApp } from '@/utils/global'
import { isPwaDisplayMode } from '@/utils/pwa'
import { useRoutePosition } from './utils/routes'

const route = useRoute()
const globalStore = useGlobalStore()

const isAppReady = computed(() => route.path !== '/')

const theme = useTheme()

useAutoTheme(usePreferredDark())
useAutoLocale(usePreferredLocale())
useDocumentTitle(
  computed(() => {
    if (isPwaDisplayMode(globalStore.displayMode)) {
      return globalStore.title ?? ''
    } else {
      return globalStore.title ? `${globalStore.title} - ${globalStore.appName}` : globalStore.appName
    }
  }),
)

useMetaThemeColor(
  computed(() => {
    const { 'status-bar': statusBarColor, background: backgroundColor } = theme.current.value.colors
    return statusBarColor ?? backgroundColor
  }),
)

const { isForward } = useRoutePosition()
const isPageTransitionEnabled = usePageTransition()

const pageTransitionName = computed(() => {
  const { transition } = currentDesignConfig.features.page
  if (!transition || !isPageTransitionEnabled.value) {
    return undefined
  }
  return isForward.value ? transition.enter : transition.leave
})

/**
 * 在 Tauri 中阻止拖动。
 *
 * 如需允许拖动，请在组件上使用 `data-allow-drag` 属性
 * @see {@linkcode isElementDraggableInLegacyApp}
 * @param event
 */
function onDragStart(event: DragEvent) {
  if (isTauriApp) {
    if (!event.target || !isElementDraggableInClientApp(event.target)) {
      event.preventDefault()
    }
  }
}

// 删除全屏区域的拖拽，否则软件无法操作
delete document.documentElement.dataset.tauriDragRegion

document.documentElement.classList.add(currentDesign)
</script>

<template>
  <v-app class="app" @dragstart="onDragStart">
    <TauriSystemBar v-if="isTauriApp" />
    <NavigationDrawer v-if="isAppReady && globalStore.navigationBarType === 'side'" />
    <v-main v-if="isAppReady" class="root-main" :scrollable="false">
      <router-view #="{ Component }">
        <div class="pages-container">
          <transition :name="pageTransitionName">
            <div :key="$route.matched[0].name" class="page-container" :data-path="route.path">
              <component :is="Component" class="page" />
            </div>
          </transition>
        </div>
      </router-view>
    </v-main>
    <SplashView v-if="!isAppReady" />
    <PwaComponent />
  </v-app>
</template>

<style lang="scss" scoped>
.app {
  // 防止移动端出现滚动条
  overflow: hidden;
}

/* .page {
  width: 100%;
  height: 100%;
} */

.root-main {
  padding-top: 0;
  overflow: hidden;
}

.pages-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.page-container {
  //设置绝对位置，方便设置动画，屏蔽了浏览器本身的文档滚动。因此需要在每个页面都添加滚动布局。
  position: absolute;
  // 使页面延申到系统栏
  top: 0;
  padding-top: var(--v-layout-top);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
