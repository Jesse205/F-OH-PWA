<script lang="ts" setup>
import { Position, usePreferredDark, useTitle } from '@vueuse/core'
import { useDisplay, useTheme } from 'vuetify'
import { watch, ref, onMounted, onBeforeUnmount, computed, unref, provide } from 'vue'
import { useRoute } from 'vue-router'
import { usePwa } from '@/events/pwa'
import { isTauri, openNewWindow, copyText } from '@/util/app'
import { getCurrent } from '@tauri-apps/api/window'
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'
import { nextTick } from 'vue'
import { useLocaleSetting } from '@/events/settings'
import { isLegacyApp } from '@/util/app'
import { useHomeNavigation } from '@/events/navigation'
import { getName } from '@tauri-apps/api/app'
import { APP_NAME_TAURI, APP_NAME_PWA, APP_NAME_DEFAULT } from './locales'
import { useDisplayMode } from './events/pwa'
import { isPwaDisplayMode } from './util/pwa'
import NavigationDrawer from './components/app/NavigationDrawer.vue'

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
    immediate: true
  }
)

const route = useRoute()

//路由名称
const routeName = computed(() => route.path.match('/[^/]+')?.[0] ?? '')

// PWA
usePwa()

// Tauri
const tauriState = isTauri()
console.log('isTauri', tauriState)
console.log('isLegacyApp', isLegacyApp())

// I18n
const { t, locale } = useI18n()
const savedLocale = useLocaleSetting()
watch(savedLocale, (newLocale) => {
  locale.value = newLocale
})

// 应用标题，动态切换不同标题
const appName = ref<string>(t('appName'))
provide('appName', appName)

//监控显示模式变换
const displayMode = useDisplayMode()
provide('displayMode', displayMode)

watch(
  displayMode,
  (newDisplayMode) => {
    // Tauri 中使用另外提供的应用名
    if (tauriState) return
    if (isPwaDisplayMode(newDisplayMode)) appName.value = APP_NAME_PWA
    else appName.value = APP_NAME_DEFAULT
  },
  { immediate: true }
)

// Tauri 中就用真实的应用名
if (tauriState) {
  appName.value = APP_NAME_TAURI
  getName().then((name) => {
    appName.value = name
  })
}

/**
 * 标题，带有后缀
 */
const title = useTitle(null, { observe: true })

// 绑定 Tauri 窗口标题
if (tauriState) {
  watch(
    title,
    (newTitle) => {
      getCurrent().setTitle(newTitle ?? appName.value)
    },
    { immediate: true }
  )
}

// 右键菜单
interface ContextMenuConfig {
  position: Position
  url: string | null
  externalUrl: string | null
  state: boolean
  time: number
}

const contextMenuConfig = reactive<ContextMenuConfig>({
  position: {
    x: 0,
    y: 0
  },
  url: null,
  externalUrl: null,
  state: false,
  time: 0
})

/**
 * 在 Tauri 中使用自定义右键菜单
 * @param event
 */
function onContextMenu(event: MouseEvent) {
  if (tauriState) {
    event.preventDefault()
    console.log('onContextMenu', `clientX=${event.clientX}, clientY=${event.clientY}`)
    // 如果上一次没有关闭上下文菜单，就需要关闭一下，防止不会刷新定位
    contextMenuConfig.state = false
    nextTick(() => {
      contextMenuConfig.state = !!(contextMenuConfig.url || contextMenuConfig.externalUrl)
    })
    contextMenuConfig.url = null
    contextMenuConfig.externalUrl = null
    for (let element = event.target as HTMLElement; element.parentElement; element = element.parentElement) {
      if (element instanceof HTMLAnchorElement && !contextMenuConfig.url) {
        if (!element.target || element.target === '_self') {
          contextMenuConfig.url = element.href
        } else if (element.target === '_blank') {
          contextMenuConfig.externalUrl = element.href
        }
      }
    }
    contextMenuConfig.position.x = event.clientX
    contextMenuConfig.position.y = event.clientY
    contextMenuConfig.time = Date.now()
  }
}

onMounted(() => document.body.addEventListener('contextmenu', onContextMenu))
onBeforeUnmount(() => document.body.removeEventListener('contextmenu', onContextMenu))

/**
 * 在 Tauri 中阻止拖动，如需允许拖动，请在组件上使用 `@dragstart.stop` 属性
 * @param event
 */
function onDragStart(event: DragEvent) {
  if (tauriState) event.preventDefault()
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
          <transition :name="route.meta.transition">
            <v-layout class="layout" :key="routeName">
              <component :is="Component" />
            </v-layout>
          </transition>
        </router-view>
        <transition ame="fade-transition">
          <div v-if="!routeName" class="splash">
            <img class="logo" src="@/assets/images/icon.svg" />
            <span>{{ appName }}</span>
          </div>
        </transition>
      </div>
    </v-main>
    <!-- Tauri 中上下文菜单 -->
    <v-menu
      class="menu"
      v-model="contextMenuConfig.state"
      @contextmenu.stop.prevent
      @selectstart.prevent
      transition="fade-transition"
      :key="contextMenuConfig.time"
    >
      <template v-slot:activator="{ props }">
        <div
          v-bind="props"
          class="contextMenuActivator"
          :style="{ left: contextMenuConfig.position.x + 'px', top: contextMenuConfig.position.y + 'px' }"
        ></div>
      </template>
      <v-list>
        <!-- 新窗口中打开 -->
        <v-list-item
          v-if="contextMenuConfig.url"
          :title="$t('openNewWindow.name')"
          @click="openNewWindow(contextMenuConfig.url)"
        />
        <!-- 浏览器中打开 -->
        <v-list-item
          v-if="contextMenuConfig.externalUrl"
          :title="$t('openNewWindow.linkInBrowser')"
          :href="contextMenuConfig.externalUrl"
          target="_blank"
        />
        <!-- 复制链接 -->
        <v-list-item
          v-if="contextMenuConfig.externalUrl"
          :title="$t('copy.link')"
          @click="copyText(contextMenuConfig.externalUrl, (state) => {})"
        />
      </v-list>
    </v-menu>
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
  // position: absolute;
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

.contextMenuActivator {
  position: absolute;
  width: 0;
  height: 0;
}
</style>
