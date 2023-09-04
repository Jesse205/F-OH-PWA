<script lang="ts" setup>
import { usePreferredDark } from '@vueuse/core'
import { useTheme } from 'vuetify'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePwa } from '@/events/pwa';

// Theme
const theme = useTheme()
const preferredDark = usePreferredDark()

watch(preferredDark, (isDark) => {
  theme.global.name.value = isDark ? 'dark' : 'light'
}, {
  immediate: true
})

const route = useRoute()

const routeName = ref('')
watch(route, () => {
  routeName.value = route.path.match('/[^/]+')?.[0] || ''
})

usePwa()


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

<style lang="scss">
@import "@/styles/overlays.scss";

.layout {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
