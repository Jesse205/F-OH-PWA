<script setup lang="ts">
import { ref } from 'vue'

const mainScroll = ref<HTMLDivElement>()
defineExpose({
  /**
   * 滚动区域元素
   */
  mainScroll,
})
</script>

<template>
  <v-main>
    <!-- 包裹一个容器，解决绝对定位包括 padding 的问题 -->
    <div class="main-container">
      <div ref="mainScroll" class="main-scroll">
        <slot />
      </div>
      <slot name="root" />
    </div>
  </v-main>
</template>

<style scoped lang="scss">
.main-container {
  height: 100%;
  position: relative;
}
// 区域滚动
.main-scroll {
  overflow-y: scroll; // auto 极端情况会导致布局闪烁
  overflow-x: hidden;
  height: 100%;
  transform: translateZ(0); // 用于开启硬件加速
}
</style>
