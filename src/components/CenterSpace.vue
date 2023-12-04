<script setup lang="ts">
defineProps<{
  /**
   * 整体距离顶部的边距
   * @default 0
   */
  top?: number
  /**
   * 整体距离左侧的边距
   * @default 0
   */
  left?: number
  /**
   * 整体距离底部的边距
   * @default 0
   */
  bottom?: number
  /**
   * 整体距离右侧的边距
   * @default 0
   */
  right?: number
}>()
</script>

<template>
  <div class="center-space" :style="{ top: `${top}px`, left: `${left}px`, bottom: `${bottom}px`, right: `${right}px` }">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.center-space {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}
</style>
