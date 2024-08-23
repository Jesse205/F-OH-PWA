<script setup lang="ts">
import { useHomeRoutes } from '@/composables/route'
import { homeRouteData } from '@/data/home'
import { useGlobalStore } from '@/store/global'
import { parseI18n } from '@/utils/i18n'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const globalStore = useGlobalStore()
const route = useRoute()
const { activePagePosition, routeButtonReplace, isInMainView } = useHomeRoutes()

const isOtherPage = computed(() => Boolean(!isInMainView.value && globalStore.title && route.path !== '/'))
</script>

<template>
  <!-- 侧滑栏 -->
  <v-navigation-drawer permanent touchless>
    <v-list class="header-icon" lines="one">
      <v-list-item prepend-avatar="@/assets/images/icon.svg" :title="globalStore.appName" />
    </v-list>

    <!-- <v-divider /> -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, index) in homeRouteData"
        :key="item.name"
        :to="{ name: item.name, replace: routeButtonReplace }"
        :prepend-icon="activePagePosition === index ? item.activeIcon : item.icon"
        :title="parseI18n(item.title, $t)"
        :disabled="item.disabled"
      />
    </v-list>
    <!-- <transition name="fade-transition">
      <v-divider v-if="!isInMainView" />
    </transition> -->
    <transition name="slide-y-transition">
      <v-list v-if="isOtherPage" density="compact" nav>
        <v-list-item :key="$route.path" prepend-icon="$foh" :title="globalStore.title" active link />
      </v-list>
    </transition>
  </v-navigation-drawer>
</template>
<style lang="scss"></style>
