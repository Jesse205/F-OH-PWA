<script setup lang="ts">
import { ref } from 'vue';

const mainScroll = ref<HTMLElement>()
defineExpose({
  mainScroll
})

</script>

<template>
  <v-main>
    <div class="mainScroll" ref="mainScroll">
      <slot />
    </div>
  </v-main>
</template>

<style scoped lang="scss">
.v-main {
  position: fixed;
  height: 100%;
  width: 100%;
}

// 区域滚动
.v-main>.mainScroll {
  overflow-y: auto;
  height: 100%;
  transform: translateZ(0); // 用于开启硬件加速
}
</style>
