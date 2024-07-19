<script setup lang="ts">
import { useHomeRoutes } from '@/composables/route'
import { homeRouteData } from '@/data/home'
import { useAppStore } from '@/store/app'
import { parseI18n } from '@/utils/i18n'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

const appStore = useAppStore()
const route = useRoute()
const { activePagePosition, routeButtonReplace, isInMainView } = useHomeRoutes()
const { smAndDown } = useDisplay()

const isRail = computed(() => smAndDown.value)

const isOtherPage = computed(() => Boolean(!isInMainView.value && appStore.title && route.path !== '/'))
</script>

<template>
  <!-- 侧滑栏 -->
  <v-navigation-drawer permanent :rail="isRail">
    <v-list class="header-icon" lines="one">
      <v-list-item prepend-avatar="@/assets/images/icon.svg" :title="appStore.appName" />
    </v-list>

    <!-- <v-divider /> -->
    <v-list density="compact" nav>
      <v-tooltip v-for="(item, index) in homeRouteData" :key="item.name" :disabled="!isRail">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :to="{ name: item.name, replace: routeButtonReplace }"
            :prepend-icon="activePagePosition === index ? item.activeIcon : item.icon"
            :title="parseI18n(item.title, $t)"
            :disabled="item.disabled"
          />
        </template>
        <span>{{ parseI18n(item.title, $t) }}</span>
      </v-tooltip>
    </v-list>
    <!-- <transition name="fade-transition">
      <v-divider v-if="!isInMainView" />
    </transition> -->
    <transition name="slide-y-transition">
      <v-list v-if="isOtherPage" density="compact" nav>
        <v-tooltip :disabled="!isRail">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :key="$route.path" prepend-icon="$circle" :title="appStore.title" active link />
          </template>
          <span>{{ appStore.title }}</span>
        </v-tooltip>
      </v-list>
    </transition>
  </v-navigation-drawer>
</template>
