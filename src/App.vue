<script lang="ts" setup>
import CenterSpace from '@/components/CenterSpace.vue'
import ContextMenu from '@/components/app/ContextMenu.vue'
import NavigationDrawer from '@/components/app/NavigationDrawer.vue'
import PwaComponent from '@/components/app/PwaComponent.vue'
import TauriSystemBar from '@/components/app/TauriSystemBar.vue'
import { useLocaleSetting } from '@/composables/settings'
import { useAppStore } from '@/store/app'
import { isLegacyApp, isTauri } from '@/util/app'
import { isElementDraggableInLegacyApp } from '@/util/drag'
import { isPwaDisplayMode } from '@/util/pwa'
import { usePreferredDark } from '@vueuse/core'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useDisplay, useTheme } from 'vuetify'
import { getCurrent as getCurrentTauri } from '@tauri-apps/api/window'
// 主题
const theme = useTheme()
const preferredDark = usePreferredDark()

// 自动设置为浏览器的主题
watch(
  preferredDark,
  (isDark) => {
    theme.global.name.value = isDark ? 'dark' : 'light'
  },
  { immediate: true },
)

const route = useRoute()
const MACHER_ROUTE_NAME = /\/[^/]+/

// 路由名称
const routeName = computed(() => route.path.match(MACHER_ROUTE_NAME)?.[0] ?? '')

// APP 模式
console.debug('isTauri', isTauri)
console.debug('isLegacyApp', isLegacyApp)

const appStore = useAppStore()

// I18n
const { locale } = useI18n()
const savedLocale = useLocaleSetting()
watch(
  savedLocale,
  (newLocale) => {
    locale.value = newLocale
    document.documentElement.setAttribute('lang', newLocale)
  },
  { immediate: true },
)

// 将store中的标题应用到网页
const documentTitle = computed(() => {
  if (isPwaDisplayMode(appStore.displayMode)) {
    return appStore.title ?? ''
  } else {
    return appStore.title ? `${appStore.title} - ${appStore.appName}` : appStore.appName
  }
})

watch(
  documentTitle,
  (newTitle) => {
    document.title = newTitle
  },
  { immediate: true },
)

/**
 * 在 Tauri 中阻止拖动。
 *
 * 如需允许拖动，请在组件上使用 `data-allow-drag` 属性
 * @see {@linkcode isElementDraggableInLegacyApp}
 * @param event
 */
function onDragStart(event: DragEvent) {
  if (isTauri) {
    if (!event.target || !isElementDraggableInLegacyApp(event.target)) {
      event.preventDefault()
    }
  }
}

const { xs } = useDisplay()

// 显示窗口
if (isLegacyApp) {
  const webView = getCurrentTauri()
  webView.show().catch(() => webView.close())
}
</script>

<template>
  <v-app class="app" @dragstart="onDragStart">
    <TauriSystemBar v-if="isTauri" />
    <NavigationDrawer v-if="!xs" />
    <v-main class="main">
      <div class="page-container">
        <router-view #="{ Component }">
          <!-- 不能去除?? ''，否则格式化工具会自动删除括号，导致高亮错误 -->
          <transition :name="(route.meta.transition as string) ?? undefined">
            <div :key="routeName" class="page" :data-path="route.path">
              <v-layout class="layout">
                <component :is="Component" />
              </v-layout>
            </div>
          </transition>
        </router-view>
        <CenterSpace v-if="!routeName" class="splash">
          <img class="logo" src="@/assets/images/icon.svg" />
          <span>{{ appStore.appName }}</span>
        </CenterSpace>
      </div>
    </v-main>
    <ContextMenu />
    <PwaComponent />
  </v-app>
</template>

<style lang="scss" scoped>
.layout {
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

.app {
  height: 100%;
  width: 100%;
  // 防止移动端出现滚动条
  overflow: hidden;
}
.main {
  padding-top: 0;
  overflow: hidden;
}
.splash {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    width: 72px;
    height: 72px;
    margin-bottom: 16px;
    flex: none;
  }
}
</style>
