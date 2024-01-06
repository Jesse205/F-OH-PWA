<script setup lang="ts">
import { useHomeNavigation } from '@/composables/navigation'
import { useAppStore } from '@/store/app'
import { computed, unref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

const appStore = useAppStore()
const route = useRoute()

/**
 * 标题，无后缀
 */
const title = computed(() => appStore.title ?? undefined)

const { pages, activePagePosition, isBackOtherPage, isInMainView } = useHomeNavigation()
const { smAndDown } = useDisplay()

const isRail = computed(() => smAndDown.value)

const isOtherPage = computed(() => Boolean(!isInMainView.value && title.value && route.path !== '/'))
</script>

<template>
  <!-- 侧滑栏 -->
  <v-navigation-drawer permanent :rail="isRail">
    <v-list class="py-2">
      <v-list-item prepend-avatar="@/assets/images/icon.svg" :title="appStore.appName" />
    </v-list>
    <!-- <v-divider /> -->
    <v-list density="compact" nav>
      <v-tooltip v-for="(item, index) in pages" :key="item.name" :disabled="!isRail">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :to="{ name: item.name }"
            :prepend-icon="activePagePosition === index ? item.activeIcon : item.icon"
            :title="unref(item.title)"
            :disabled="item.disabled"
            :replace="isInMainView && (activePagePosition !== 0 || isBackOtherPage)"
          />
        </template>
        <span>{{ unref(item.title) }}</span>
      </v-tooltip>
    </v-list>
    <!-- <transition name="fade-transition">
      <v-divider v-if="!isInMainView" />
    </transition> -->
    <transition name="slide-y-transition">
      <v-list v-if="isOtherPage" density="compact" nav color="primary">
        <v-tooltip :disabled="!isRail">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :key="$route.path" prepend-icon="$circle" :title="title" active link />
          </template>
          <span>{{ title }}</span>
        </v-tooltip>
      </v-list>
    </transition>
  </v-navigation-drawer>
</template>
