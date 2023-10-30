<script lang="ts" setup>
import { Position, usePreferredDark, useTitle } from '@vueuse/core'
import { useDisplay, useTheme } from 'vuetify'
import { watch, ref, onMounted, onBeforeUnmount, computed } from 'vue'
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

// Theme
const theme = useTheme()
const preferredDark = usePreferredDark()

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
const routeName = ref('')

watch(route, () => {
  routeName.value = route.path.match('/[^/]+')?.[0] || ''
})

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

// 标题
const title = useTitle(t('appName'), { observe: true })

if (isTauri()) {
  // 绑定 Tauri 窗口标题
  watch(
    title,
    (newTitle) => {
      getCurrent().setTitle(newTitle ?? t('appName'))
    },
    { immediate: true }
  )
}

const clearTitle = computed(() => {
  console.log(title.value?.match(/(.+) -[^-]$/));
  return title.value?.match(/(.+) -/)?.[1]
})

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

const { pages } = useHomeNavigation()
const { xs, smAndDown } = useDisplay()

const activePagePosition = computed(() => pages.value.findIndex((page) => page.name === route.name))
</script>

<template>
  <v-app class="root" @dragstart="onDragStart">
    <!-- 侧滑栏 -->
    <v-navigation-drawer v-if="!xs" permanent :rail="smAndDown">
      <v-list>
        <v-list-item prepend-avatar="@/assets/images/icon.svg" :title="$t('appName')" />
      </v-list>
      <v-divider />
      <v-list density="compact" nav color="primary">
        <v-list-item
          v-for="(item, index) in pages"
          :key="item.name"
          :to="{ name: item.name }"
          :prepend-icon="activePagePosition === index ? item.activeIcon : item.icon"
          :title="item.title"
          :disabled="item.disabled"
          rounded
        />
      </v-list>
      <template v-if="activePagePosition === -1">
        <v-divider />
        <v-list density="compact" nav color="primary">
          <v-list-item prepend-icon="" :title="clearTitle" rounded active />
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <div class="main">
        <router-view v-slot="{ Component }">
          <transition :name="route.meta.transition">
            <v-layout class="layout" :key="routeName">
              <component :is="Component" />
            </v-layout>
          </transition>
        </router-view>
      </div>
    </v-main>
  </v-app>

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
        @click="copyText(contextMenuConfig.externalUrl, (state) => {})"
      />
    </v-list>
  </v-menu>
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

.contextMenuActivator {
  position: absolute;
  width: 0;
  height: 0;
}
</style>
