<script setup lang="ts">
import { computed, unref } from 'vue'
import { useDisplay } from 'vuetify'
import { useHomeNavigation } from '@/composables/navigation'
import { useAppStore } from '@/store/app'
import { useRoute } from 'vue-router'

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
    <!-- <template v-if="!isRail"> -->
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
    <!-- </template> -->
    <!-- <div v-else class="rail-navigation-wrapper">
      <v-bottom-navigation class="rail-navigation" :grow="false">
        <v-btn
          v-for="item in pages"
          :key="item.name"
          :to="{ name: item.name }"
          :disabled="item.disabled"
          :replace="isInMainView && (activePagePosition !== 0 || isBackOtherPage)"
        >
          <v-icon>{{ $route.name === item.name ? item.activeIcon : item.icon }}</v-icon>
          <span>{{ item.title }}</span>
        </v-btn>
      </v-bottom-navigation>
    </div> -->
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
/* .rail-navigation-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  .rail-navigation {
    position: unset !important;
    height: 100% !important;
    max-height: 364px;
    width: 100% !important;
    &:deep(.v-bottom-navigation__content) {
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: 100%;
      .v-btn {
        height: 0;
        flex-grow: 1;
        width: 100%;
      }
    }
  }
} */
</style>
