<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

import { PATH_MAIN } from '@/constants/urls'

const router = useRouter()
const route = useRoute()
const { smAndDown } = useDisplay()

const canBack = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  route.path // 确保路由刷新时重新调用该函数
  return Boolean(router.options.history.state.back)
})

/**
 * 是否为主页按钮
 *
 * 当不可以返回上一页并且当前路径不是主页时显示按钮。
 */
const isHomeButton = computed(() => {
  return Boolean(!canBack.value && !route.path.startsWith(PATH_MAIN))
})

/**
 * - 如果可以返回，则显示按钮。
 * - 如果该按钮是首页按钮，并且屏幕宽度为mdAndDown，则显示按钮。
 */
const isBtnShowing = computed(() => {
  return Boolean(canBack.value || (smAndDown.value && isHomeButton.value))
})

function onClick() {
  if (isHomeButton.value) {
    router.push({ name: 'Home' })
  } else {
    router.back()
  }
}
</script>

<template>
  <transition name="slide-x-transition">
    <v-btn
      v-if="isBtnShowing"
      v-tooltip="isHomeButton ? $t('home') : $t('action.back')"
      v-bind="$attrs"
      class="btn"
      :icon="isHomeButton ? '$home' : '$back'"
      :aria-label="$t('action.back')"
      @click.stop="onClick"
    />
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
