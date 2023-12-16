<script setup lang="ts">
import { PATH_HOME } from '@/router'
import { computed, useAttrs } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const attrs = useAttrs()

const router = useRouter()
const route = useRoute()
const { xs } = useDisplay()

const canBack = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  route.path // 确保路由刷新时重新调用该函数
  return Boolean(router.options.history.state.back)
})

/**
 * 是否为主页按钮
 *
 * 当可以返回上一页并且当前路径不是主页时显示按钮。
 */
const isHomeButton = computed(() => {
  return !canBack.value && route.path !== PATH_HOME
})

/**
 * - 如果可以返回，则显示按钮。
 * - 如果该按钮是首页按钮，并且屏幕宽度为xs，则显示按钮。
 */
const isBtnShowing = computed(() => {
  return canBack.value || (xs.value && isHomeButton.value)
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
  <v-tooltip>
    <template #activator="{ props }">
      <transition name="slide-x-transition">
        <v-btn
          v-show="isBtnShowing"
          class="btn"
          :icon="isHomeButton ? '$home' : '$back'"
          v-bind="{ ...attrs, ...props }"
          :aria-label="$t('back.name')"
          @click.stop="onClick"
        />
      </transition>
    </template>
    <span>{{ isHomeButton ? $t('home.name') : $t('back.name') }}</span>
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
