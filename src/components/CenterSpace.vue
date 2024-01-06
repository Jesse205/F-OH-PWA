<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
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

const style = computed(() => {
  return {
    top: props.top && `${props.top}px`,
    left: props.left && `${props.left}px`,
    bottom: props.bottom && `${props.bottom}px`,
    right: props.right && `${props.right}px`,
  }
})
</script>

<template>
  <div class="center-space" :style="style">
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
  & > :deep(*) {
    pointer-events: auto;
  }
}
</style>
