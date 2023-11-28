<script setup lang="ts">
import { ref } from 'vue'

const mainScroll = ref<HTMLElement>()
defineExpose({
  mainScroll,
})
</script>

<template>
  <v-main>
    <div ref="mainScroll" class="mainScroll">
      <slot />
    </div>
  </v-main>
</template>

<style scoped lang="scss">
// 区域滚动
.v-main > .mainScroll {
  overflow-y: scroll; // auto 极端情况会导致布局闪烁
  height: 100%;
  transform: translateZ(0); // 用于开启硬件加速
}
</style>
