<script lang="ts" setup>
import { Position, usePreferredDark, useTitle } from '@vueuse/core'
import { useTheme } from 'vuetify'
import { watch, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePwa } from '@/events/pwa'
import { isTauri, openNewWindow, copyText } from '@/util/app'
import { appWindow, getCurrent } from '@tauri-apps/api/window'
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'
import { nextTick } from 'vue'
import { useLocaleSetting } from './events/settings'

// Theme
const theme = useTheme()
const preferredDark = usePreferredDark()

watch(
  preferredDark,
  isDark => {
    theme.global.name.value = isDark ? 'dark' : 'light'
  },
  {
    immediate: true
  }
)

const route = useRoute()
//路由名称
const routeName = ref('')

watch(route, () => {
  routeName.value = route.path.match('/[^/]+')?.[0] || ''
})

// PWA
usePwa()

// Tauri
const tauriState = isTauri()
console.log('isTauri', tauriState)

// I18n
const { t, locale } = useI18n()

// 标题
const title = useTitle(t('appName'), { observe: true })

if (isTauri()) {
  // 绑定 Tauri 窗口标题
  watch(
    title,
    newTitle => {
      getCurrent().setTitle(newTitle || t('appName'))
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
    // 如果上一次没有关闭上下文菜单，就需要关闭一下，方式不会刷新定位
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

// 语言切换
const savedLocale = useLocaleSetting()
watch(savedLocale, newLocale => {
  locale.value = newLocale
})
</script>

<template>
  <div class="root" @dragstart="onDragStart">
    <transition :name="route.meta.transition">
      <v-app class="layout" :key="routeName">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </v-app>
    </transition>
  </div>
  <!-- Tauri 中上下文菜单 -->
  <div
    class="contextMenuActiviter"
    :style="{ left: contextMenuConfig.position.x + 'px', top: contextMenuConfig.position.y + 'px' }"
  ></div>
  <v-menu
    class="menu"
    v-model="contextMenuConfig.state"
    @contextmenu.stop.prevent
    @selectstart.prevent
    activator=".contextMenuActiviter"
    transition="fade-transition"
    :key="contextMenuConfig.time"
  >
    <v-list>
      <v-list-item
        v-if="contextMenuConfig.url"
        :title="$t('openNewWindow.name')"
        @click="openNewWindow(contextMenuConfig.url)"
      />
      <v-list-item
        v-if="contextMenuConfig.externalUrl"
        :title="$t('openNewWindow.linkInBrowser')"
        :href="contextMenuConfig.externalUrl"
        target="_blank"
      />
      <v-list-item
        v-if="contextMenuConfig.externalUrl"
        :title="$t('copy.link')"
        @click="copyText(contextMenuConfig.externalUrl, state => {})"
      />
    </v-list>
  </v-menu>
</template>

<style lang="scss" scoped>
//设置绝对位置，方便设置动画，屏蔽了浏览器本身的文档滚动。因此需要在每个页面都添加滚动布局。
.layout {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

// 防止移动端出现滚动条
.root {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
}

.contextMenuActiviter {
  position: absolute;
  width: 0;
  height: 0;
}
</style>
