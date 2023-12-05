<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { useTauriSystemBar } from '@/events/tauri'
import { getCurrent } from '@tauri-apps/api/window'

const appWindow = getCurrent()
const title = useTitle(null, { observe: true })

const { isMaximized } = useTauriSystemBar()
</script>

<template>
  <v-system-bar class="system-bar" color="transparent" data-tauri-drag-region window>
    <span>{{ title }}</span>
    <v-spacer />
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
      class="system-bar__btn_close"
      icon="$window-close"
      variant="text"
      color="on-background"
      :title="$t('close.name')"
      @click="appWindow.close()"
    />
  </v-system-bar>
</template>

<style scoped lang="scss">
.system-bar {
  padding-inline-end: 0 !important;
  overflow: hidden;
  user-select: none;
  & > span {
    // 禁止选择+防止阻止拖动窗口
    pointer-events: none;
  }
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
  }
  // 关闭按钮需要特别地设置
  & &__btn_close {
    &:hover {
      background-color: rgb(var(--v-theme-error)) !important;
      color: rgb(var(--v-theme-on-error)) !important;
    }
    :deep(.v-btn__overlay) {
      color: currentColor;
    }
  }
}
</style>
