<script setup lang="ts">
import { computed, unref } from 'vue'
import { useDisplay } from 'vuetify'
import { useHomeNavigation } from '@/events/navigation'
import { useTitle } from '@vueuse/core'
import { useAppStore } from '../../store/app'

// const appName = useGlobalAppName()

const appStore = useAppStore()

/**
 * 标题，带有后缀
 */
const title = useTitle(null, { observe: true })

/**
 * 标题，无后缀
 */
const clearTitle = computed(() => title.value?.match(`^(.+) - ${appStore.appName}$`)?.[1] ?? title.value ?? 'Unknown')

const { pages, activePagePosition, isBackOtherPage, isInMainView } = useHomeNavigation()
const { xs, smAndDown } = useDisplay()
</script>

<template>
  <!-- 侧滑栏 -->
  <v-navigation-drawer v-if="!xs" permanent :rail="smAndDown">
    <v-list>
      <v-list-item prepend-avatar="@/assets/images/icon.svg" :title="appStore.appName" />
    </v-list>
    <v-divider />
    <v-list density="compact" nav color="primary">
      <v-list-item
        v-for="(item, index) in pages"
        :key="item.name"
        :to="{ name: item.name }"
        :prepend-icon="activePagePosition === index ? item.activeIcon : item.icon"
        :title="unref(item.title)"
        :disabled="item.disabled"
        :replace="isInMainView && (activePagePosition !== 0 || isBackOtherPage)"
      />
    </v-list>
    <transition name="fade-transition">
      <v-divider v-if="!isInMainView" />
    </transition>
    <transition name="slide-y-transition">
      <v-list v-if="!isInMainView" density="compact" nav color="primary">
        <v-list-item :key="$route.path" prepend-icon="mdi-circle-outline" :title="clearTitle ?? ''" active link />
      </v-list>
    </transition>
  </v-navigation-drawer>
</template>

<!-- <style scoped></style> -->
