<script setup lang="ts">
import { isTauriApp } from '@/utils/app'
import { copyText } from '@/utils/clipboard'
import { openNewWindow } from '@/utils/window'
import { onBeforeUnmount, onMounted, reactive } from 'vue'

// 右键菜单
interface ContextMenuConfig {
  position: [x: number, x: number]
  url: string | null
  externalUrl: string | null
  state: boolean
  timeoutId?: number
}
const config: ContextMenuConfig = reactive<ContextMenuConfig>({
  position: [0, 0],
  url: null,
  externalUrl: null,
  state: false,
})

/**
 * 在 Tauri 中使用自定义右键菜单
 * @param event
 */
function onContextMenu(event: MouseEvent) {
  if (isTauriApp) {
    event.preventDefault()
    console.debug('onContextMenu', `clientX=${event.clientX}, clientY=${event.clientY}`)

    // 如果上一次没有关闭上下文菜单，就需要关闭一下，以播放完整的动画
    const previousState = config.state
    config.state = false
    if (previousState || config.timeoutId !== undefined) {
      clearTimeout(config.timeoutId)
      config.timeoutId = setTimeout(() => {
        config.timeoutId = undefined
        updateConfigWithEvent(event)
        config.state = isNeedShowMenu()
      }, 100)
    } else {
      updateConfigWithEvent(event)
      config.state = isNeedShowMenu()
    }
  }
}

function isNeedShowMenu() {
  return !!(config.url ?? config.externalUrl)
}

function updateConfig(element: HTMLElement, position: [x: number, y: number]) {
  config.url = null
  config.externalUrl = null
  for (let current = element; current.parentElement; current = current.parentElement) {
    if (current instanceof HTMLAnchorElement && !config.url) {
      if (!current.target || current.target === '_self') {
        config.url = current.href
      } else if (current.target === '_blank') {
        config.externalUrl = current.href
      }
    }
  }
  config.position = position
}

function updateConfigWithEvent(event: MouseEvent) {
  updateConfig(event.target as HTMLElement, [event.clientX, event.clientY])
}

onMounted(() => document.body.addEventListener('contextmenu', onContextMenu))
onBeforeUnmount(() => document.body.removeEventListener('contextmenu', onContextMenu))
</script>

<template>
  <!-- 不要对 v-menu 使用 :key，否则会导致错位 -->
  <v-menu v-model="config.state" class="menu" @contextmenu.stop.prevent @selectstart.prevent :target="config.position">
    <v-list>
      <!-- 新窗口中打开 -->
      <v-list-item v-if="config.url" :title="$t('action.openNewWindow')" @click="openNewWindow(config.url)" />
      <!-- 浏览器中打开 -->
      <v-list-item
        v-if="config.externalUrl"
        :title="$t('action.openLinkInBrowser')"
        :href="config.externalUrl"
        target="_blank"
      />
      <!-- 复制链接 -->
      <v-list-item v-if="config.externalUrl" :title="$t('action.copyLink')" @click="copyText(config.externalUrl)" />
    </v-list>
  </v-menu>
</template>

<style scoped lang="scss"></style>
