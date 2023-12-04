<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isBtnShowing = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  route.path // 确保路由刷新时重新调用该函数
  return !!router.options.history.state.back
})
const attrs = useAttrs()
</script>

<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <transition name="slide-x-transition">
        <v-btn
          v-show="isBtnShowing"
          class="btn"
          icon="$back"
          v-bind="{ ...attrs, ...props }"
          :aria-label="$t('back.name')"
          @click.stop="$router.back"
        />
      </transition>
    </template>
    <span>{{ $t('back.name') }}</span>
  </v-tooltip>
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
