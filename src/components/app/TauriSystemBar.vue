<script setup lang="ts">
import { useTauriSystemBar } from '@/composables/tauri'
import { useTitle, useWindowFocus } from '@vueuse/core'

const title = useTitle(null, { observe: true })
const windowFocus = useWindowFocus()

const { appWindow, isMaximized } = useTauriSystemBar()
</script>

<template>
  <v-system-bar class="SystemBar" :class="{ 'SystemBar--focused': windowFocus }" color="transparent" window>
    <div data-tauri-drag-region class="drag-region">
      <span class="title">{{ title }}</span>
    </div>
    <v-btn
      icon="$window-minimize"
      variant="text"
      color="on-background"
      :title="$t('minimize.name')"
      @click="appWindow.minimize()"
    />
    <v-btn
      :icon="isMaximized ? '$window-restore' : '$window-maximize'"
      variant="text"
      color="on-background"
      :title="$t('maximize.name')"
      @click="appWindow.toggleMaximize()"
    />
    <v-btn
      class="close"
      icon="$window-close"
      variant="text"
      color="on-background"
      :title="$t('close.name')"
      @click="appWindow.close()"
    />
  </v-system-bar>
</template>

<style scoped lang="scss">
.SystemBar {
  padding-inline-end: 0 !important;
  overflow: hidden;
  user-select: none;
  opacity: 0.6;
  :deep(.v-btn) {
    height: 32px;
    width: 40px;
    border-radius: 0px !important;
    transition: none;
    > .v-btn__overlay {
      transition: none;
    }
    .v-icon {
      height: 16px;
      width: 16px;
    }
    // 关闭按钮需要特别地设置
    &.close {
      &:hover {
        background-color: rgb(var(--v-theme-error)) !important;
        color: rgb(var(--v-theme-on-error)) !important;
      }
      :deep(.v-btn__overlay) {
        color: currentColor;
      }
    }
  }
  &--focused {
    opacity: 1;
  }
}

.drag-region {
  // 禁止选择+防止阻止拖动窗口
  flex-grow: 1;
  text-align: start;
  pointer-events: none;
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
