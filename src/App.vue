<script lang="ts" setup>
import { usePreferredDark, useTitle } from '@vueuse/core'
import { useTheme } from 'vuetify'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePwa } from '@/events/pwa';
import { isTauri } from '@/util/app';
import { getCurrent } from '@tauri-apps/api/window'
import { useI18n } from 'vue-i18n';

// Theme
const theme = useTheme()
const preferredDark = usePreferredDark()

watch(preferredDark, (isDark) => {
  theme.global.name.value = isDark ? 'dark' : 'light'
}, {
  immediate: true
})

const route = useRoute()
//路由名称
const routeName = ref('')

watch(route, () => {
  routeName.value = route.path.match('/[^/]+')?.[0] || ''
})

// PWA
usePwa()

// Tauri
console.log('isTauri', isTauri())

// I18n
const { t } = useI18n()

// 标题
const title = useTitle(t('appName'), { observe: true })

if (isTauri()) {
  // 绑定 Tauri 窗口标题
  watch(title, (newTitle) => {
    getCurrent().setTitle(newTitle || t('appName'))
  }, { immediate: true })
}

</script>

<template>
  <div class="root">
    <transition :name="route.meta.transition">
      <v-app class="layout" :key="routeName">
        <router-view v-slot="{ Component }">
          <keep-alive :max="10">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </v-app>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
//设置绝对位置，方便设置动画，屏蔽了浏览器本身的文档滚动。因此需要在每个页面都添加滚动布局。
.layout {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

// 防止移动端出现滚动条
.root {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
}
</style>
