<script setup lang="ts">
import { copyText, openNewWindow, isTauri } from '@/util/app'
import { Position } from '@vueuse/core'
import { nextTick, onBeforeUnmount, onMounted, reactive } from 'vue'

// 右键菜单
interface ContextMenuConfig {
  position: Position
  url: string | null
  externalUrl: string | null
  state: boolean
  time: number
}
const config: ContextMenuConfig = reactive<ContextMenuConfig>({
  position: {
    x: 0,
    y: 0
  },
  url: null,
  externalUrl: null,
  state: false,
  time: 0
})
const tauriState = isTauri

/**
 * 在 Tauri 中使用自定义右键菜单
 * @param event
 */
function onContextMenu(event: MouseEvent) {
  if (tauriState) {
    event.preventDefault()
    console.debug('onContextMenu', `clientX=${event.clientX}, clientY=${event.clientY}`)
    // 如果上一次没有关闭上下文菜单，就需要关闭一下，防止不会刷新定位
    config.state = false
    nextTick(() => {
      config.state = !!(config.url ?? config.externalUrl)
    })
    config.url = null
    config.externalUrl = null
    for (let element = event.target as HTMLElement; element.parentElement; element = element.parentElement) {
      if (element instanceof HTMLAnchorElement && !config.url) {
        if (!element.target || element.target === '_self') {
          config.url = element.href
        } else if (element.target === '_blank') {
          config.externalUrl = element.href
        }
      }
    }
    config.position.x = event.clientX
    config.position.y = event.clientY
    config.time = Date.now()
  }
}

onMounted(() => document.body.addEventListener('contextmenu', onContextMenu))
onBeforeUnmount(() => document.body.removeEventListener('contextmenu', onContextMenu))
</script>

<template>
  <v-menu
    class="menu"
    v-model="config.state"
    @contextmenu.stop.prevent
    @selectstart.prevent
    transition="fade-transition"
    :key="config.time"
  >
    <template v-slot:activator="{ props }">
      <div
        v-bind="props"
        class="contextMenuActivator"
        :style="{ left: config.position.x + 'px', top: config.position.y + 'px' }"
      ></div>
    </template>
    <v-list>
      <!-- 新窗口中打开 -->
      <v-list-item v-if="config.url" :title="$t('openNewWindow.name')" @click="openNewWindow(config.url)" />
      <!-- 浏览器中打开 -->
      <v-list-item
        v-if="config.externalUrl"
        :title="$t('openNewWindow.linkInBrowser')"
        :href="config.externalUrl"
        target="_blank"
      />
      <!-- 复制链接 -->
      <v-list-item
        v-if="config.externalUrl"
        :title="$t('copy.link')"
        @click="copyText(config.externalUrl, (state) => {})"
      />
    </v-list>
  </v-menu>
</template>

<style scoped lang="scss">
.contextMenuActivator {
  position: absolute;
  width: 0;
  height: 0;
}
</style>
