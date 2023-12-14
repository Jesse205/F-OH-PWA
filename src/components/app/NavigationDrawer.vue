<script setup lang="ts">
import { computed, unref } from 'vue'
import { useDisplay } from 'vuetify'
import { useHomeNavigation } from '@/composables/navigation'
import { useTitle } from '@vueuse/core'
import { useAppStore } from '@/store/app'

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
const { smAndDown } = useDisplay()
</script>

<template>
  <!-- 侧滑栏 -->
  <v-navigation-drawer permanent :rail="smAndDown">
    <v-list class="py-2">
      <v-list-item prepend-avatar="@/assets/images/icon.svg" :title="appStore.appName" />
    </v-list>
    <!-- <v-divider /> -->
    <v-list density="compact" nav>
      <v-tooltip v-for="(item, index) in pages" :key="item.name" location="right" disabled>
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
      <v-list v-if="!isInMainView" density="compact" nav color="primary">
        <v-list-item :key="$route.path" prepend-icon="$circle" :title="clearTitle ?? ''" active link />
      </v-list>
    </transition>
  </v-navigation-drawer>
</template>

<!-- <style scoped></style> -->
