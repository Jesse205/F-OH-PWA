<script lang="ts" setup>
import { usePreferredDark } from '@vueuse/core'
import { useTheme } from 'vuetify'
import { watch, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { usePwa } from '@/events/pwa'
import { isTauri } from '@/util/app'
import { useI18n } from 'vue-i18n'
import { useLocaleSetting } from '@/events/settings'
import { isLegacyApp } from '@/util/app'
import NavigationDrawer from './components/app/NavigationDrawer.vue'
import ContextMenu from './components/app/ContextMenu.vue'
import { useAppStore } from './store/app'

// 主题
const theme = useTheme()
const preferredDark = usePreferredDark()

// 自动设置为浏览器的主题
watch(
  preferredDark,
  (isDark) => {
    theme.global.name.value = isDark ? 'dark' : 'light'
  },
  {
    immediate: true,
  },
)

const route = useRoute()

// 路由名称
const routeName = computed(() => route.path.match('/[^/]+')?.[0] ?? '')

// PWA
usePwa()

// Tauri
console.debug('isTauri', isTauri)
console.debug('isLegacyApp', isLegacyApp())

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
watchEffect(() => {
  document.title = appStore.title ? `${appStore.title} - ${appStore.appName}` : appStore.appName
})

/**
 * 在 Tauri 中阻止拖动，如需允许拖动，请在组件上使用 `@dragstart.stop` 属性
 * @param event
 */
function onDragStart(event: DragEvent) {
  if (isTauri) event.preventDefault()
}
</script>

<template>
  <v-app class="root" @dragstart="onDragStart">
    <!--<v-system-bar v-if="tauriState" window color="background">
      <span>{{ title }}</span>
      <v-spacer />
      <v-btn icon="mdi-window-minimize" density="comfortable" variant="text" color="" />
      <v-btn icon="mdi-window-maximize" density="comfortable" variant="text" color="" />
      <v-btn icon="mdi-window-close" density="comfortable" variant="text" color="" />
    </v-system-bar>-->
    <navigation-drawer />
    <v-main>
      <div class="main">
        <router-view v-slot="{ Component }">
          <transition :name="route.meta.transition as string">
            <v-layout :key="routeName" class="layout">
              <component :is="Component" />
            </v-layout>
          </transition>
        </router-view>
        <transition ame="fade-transition">
          <div v-if="!routeName" class="splash">
            <img class="logo" src="@/assets/images/icon.svg" />
            <span>{{ appStore.appName }}</span>
          </div>
        </transition>
      </div>
    </v-main>
    <ContextMenu />
  </v-app>
</template>

<style lang="scss" scoped>
//设置绝对位置，方便设置动画，屏蔽了浏览器本身的文档滚动。因此需要在每个页面都添加滚动布局。
.layout {
  position: absolute !important;
  width: 100%;
  height: 100%;
}

// 防止移动端出现滚动条
.root {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.main {
  position: relative;
  width: 100%;
  height: 100%;
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
