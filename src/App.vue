<script lang="ts" setup>
import { usePreferredDark } from '@vueuse/core'
import { useTheme } from 'vuetify'
import { watch, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePwa } from '@/composables/pwa'
import { isTauri } from '@/util/app'
import { useI18n } from 'vue-i18n'
import { useLocaleSetting } from '@/composables/settings'
import { isLegacyApp } from '@/util/app'
import NavigationDrawer from './components/app/NavigationDrawer.vue'
import ContextMenu from './components/app/ContextMenu.vue'
import { useAppStore } from './store/app'
import { isPwaDisplayMode } from './util/pwa'
import TauriSystemBar from './components/app/TauriSystemBar.vue'
import { isElementDraggableInLegacyApp } from './util/drag'
import { useRegisterSW } from 'virtual:pwa-register/vue'

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

// 路由名称
const routeName = computed(() => route.path.match('/[^/]+')?.[0] ?? '')

// PWA
usePwa()

const { needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true })
const reloadDialogVisible = ref(false)
watch(needRefresh, (newValue) => {
  if (newValue) reloadDialogVisible.value = true
})

function updateAndReload() {
  updateServiceWorker()
  reloadDialogVisible.value = false
}

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
console.log(__IS_TAURI__)
</script>

<template>
  <v-app class="root" @dragstart="onDragStart">
    <TauriSystemBar v-if="isTauri" />
    <NavigationDrawer />
    <v-main class="main">
      <div class="page-container">
        <router-view v-slot="{ Component }">
          <!-- 不能去除?? ''，否则格式化工具会自动删除括号，导致高亮错误 -->
          <transition :name="(route.meta.transition as string) ?? ''">
            <div :key="routeName" class="page" :data-path="route.path">
              <v-layout class="layout">
                <component :is="Component" />
              </v-layout>
            </div>
          </transition>
        </router-view>
        <div v-if="!routeName" class="splash">
          <img class="logo" src="@/assets/images/icon.svg" />
          <span>{{ appStore.appName }}</span>
        </div>
      </div>
    </v-main>
    <ContextMenu />
    <v-dialog v-model="reloadDialogVisible">
      <v-card :title="$t('update.name')">
        <v-card-text> 应用有更新，需要重新加载 </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="reloadDialogVisible = false"> {{ $t('cancel.name') }} </v-btn>
          <v-btn variant="text" @click="updateAndReload">
            {{ $t('ok.name') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style lang="scss" scoped>
//设置绝对位置，方便设置动画，屏蔽了浏览器本身的文档滚动。因此需要在每个页面都添加滚动布局。
.layout {
  width: 100%;
  height: 100%;
}
.page {
  position: absolute;
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

// 防止移动端出现滚动条
.root {
  height: 100%;
  width: 100%;
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
@/composables/pwa@/composables/settings