<script lang="ts" setup>
import NavigationDrawer from '@/components/app/NavigationDrawer.vue'
import PwaComponent from '@/components/app/PwaComponent.vue'
import TauriSystemBar from '@/components/app/TauriSystemBar.vue'
import { usePreferredLocale } from '@/composables/settings'
import { useAppStore } from '@/store/app'
import { isElementDraggableInClientApp } from '@/utils/drag'
import { isPwaDisplayMode } from '@/utils/pwa'
import { useTitle as useDocumentTitle, usePreferredDark } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAutoLocale, useAutoTheme } from './composables/app'
import SplashView from './pages/splash/SplashView.vue'
import { isTauriApp } from './utils/app'

const { smAndUp } = useDisplay()
const route = useRoute()
const appStore = useAppStore()

const REGEX_ROUTE_NAME = /\/[^/]+/

// 路由名称
const routeName = computed(() => route.path.match(REGEX_ROUTE_NAME)?.[0] ?? '')

useAutoTheme(usePreferredDark())
useAutoLocale(usePreferredLocale())
useDocumentTitle(
  computed(() => {
    if (isPwaDisplayMode(appStore.displayMode)) {
      return appStore.title ?? ''
    } else {
      return appStore.title ? `${appStore.title} - ${appStore.appName}` : appStore.appName
    }
  }),
)

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

document.documentElement.classList.add(appStore.design)
</script>

<template>
  <v-app class="app" @dragstart="onDragStart">
    <TauriSystemBar v-if="isTauriApp" />
    <NavigationDrawer v-if="routeName && smAndUp" />
    <v-main v-if="routeName" class="main">
      <div class="page-container">
        <router-view #="{ Component }">
          <transition :name="route.meta.transition">
            <div :key="routeName" class="page" :data-path="route.path">
              <!-- <v-layout class="layout"> -->
                <component :is="Component" />
              <!-- </v-layout> -->
            </div>
          </transition>
        </router-view>
      </div>
    </v-main>
    <SplashView v-if="!routeName" />
    <!-- <ContextMenu /> -->
    <PwaComponent />
  </v-app>
  <!-- 窗口边框 -->
  <Teleport v-if="isTauriApp" to="body">
    <div class="border window-border"></div>
  </Teleport>
</template>

<style lang="scss" scoped>
.app {
  height: 100%;
  width: 100%;
  // 防止移动端出现滚动条
  overflow: hidden;
}

:deep(.v-layout) {
  width: 100%;
  height: 100%;
}
.page {
  //设置绝对位置，方便设置动画，屏蔽了浏览器本身的文档滚动。因此需要在每个页面都添加滚动布局。
  position: absolute;
  // 使布局位于窗口顶部
  top: 0;
  padding-top: var(--v-layout-top);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.page-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main {
  padding-top: 0;
  overflow: hidden;
}
.window-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}
</style>
