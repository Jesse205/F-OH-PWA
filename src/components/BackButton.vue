<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isBtnShowing = computed(() => {
  route.path //确保路由刷新时重新调用该函数
  return !!router.options.history.state.back
})
</script>

<template>
  <transition name="slide-x-transition">
    <v-btn class="btn" v-show="isBtnShowing" icon="mdi-arrow-left" @click.stop="$router.back" />
  </transition>
</template>

<style scoped lang="scss">
//同时修改按钮宽度和边距，移动其他元素
.slide-x-transition-enter-active,
.slide-x-transition-leave-active {
  transition-property: transform, opacity, width, margin !important;
}

.slide-x-transition-enter-from,
.slide-x-transition-leave-to {
  width: 0 !important;
  margin: 0 !important;
}
</style>