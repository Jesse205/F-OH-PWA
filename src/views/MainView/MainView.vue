<script setup lang="ts">
import { inject, ref, MaybeRef, computed, watchEffect } from 'vue'
import { useDisplay } from 'vuetify'
import { useHomeStore } from '@/store/home'
import { useI18n } from 'vue-i18n'
import AppMain from '@/components/AppMain.vue'
import { useRoute } from 'vue-router'
import { useHomeTitle } from '@/events/title'
import { URL_UPLOAD } from '@/data/constants'

const { t } = useI18n()
const homeStore = useHomeStore()

interface Page {
  title: MaybeRef
  icon: string
  activeIcon: string
  name: string
  disabled?: boolean
}

const pages = computed<Page[]>(() => {
  return [
    {
      title: t('home.name'),
      icon: 'mdi-home-variant-outline',
      activeIcon: 'mdi-home-variant',
      name: 'Home'
    },
    {
      title: t('category.name', 2),
      icon: 'mdi-apps',
      activeIcon: 'mdi-apps',
      name: 'Categories'
    },
    {
      title: t('update.name'),
      icon: 'mdi-update',
      activeIcon: 'mdi-update',
      name: 'Update',
      disabled: true
    },
    {
      title: t('me.name'),
      icon: 'mdi-account-outline',
      activeIcon: 'mdi-account',
      name: 'Me'
    }
  ]
})

const route = useRoute()
const homeTitle = ref('')
useHomeTitle(homeTitle)

watchEffect(() => {
  for (const item of pages.value) {
    if (item.name === route.name) {
      homeTitle.value = item.title
      break
    }
  }
})

const { xs, smAndDown } = useDisplay()

// PWA
const installBtnVisible = inject('installBtnVisible')
const onInstallBtnClick = inject('onInstallBtnClick') as () => void
</script>

<template>
  <!-- 侧滑栏 -->
  <v-navigation-drawer v-if="!xs" permanent :rail="smAndDown">
    <v-list>
      <v-list-item prepend-avatar="@/assets/images/icon.svg" :title="$t('appName')" />
    </v-list>
    <v-divider />
    <v-list density="compact" nav color="primary">
      <v-list-item
        v-for="item in pages"
        :key="item.name"
        :to="{ name: item.name }"
        replace
        :prepend-icon="$route.name === item.name ? item.activeIcon : item.icon"
        :title="item.title"
        :disabled="item.disabled"
        rounded
      />
    </v-list>
  </v-navigation-drawer>

  <!-- 应用栏 -->
  <v-app-bar flat border="b">
    <!-- <v-app-bar-nav-icon v-if="!mobile" @click.stop="drawer = !drawer" /> -->
    <v-app-bar-title>{{ homeStore.fragmentTitle }}</v-app-bar-title>
    <v-spacer />
    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-magnify" v-bind="props" disabled />
      </template>
      <span>搜索应用</span>
    </v-tooltip>
    <v-menu origin="top" width="192" location="top" scrim="transparent">
      <template v-slot:activator="{ props: menu }">
        <v-btn icon="mdi-dots-vertical" v-bind="menu" />
      </template>
      <v-list>
        <!-- TODO: 使用Upload页面 -->
        <v-list-item :title="$t('upload.app')" :href="URL_UPLOAD" target="_blank" />
        <v-list-item v-if="installBtnVisible" :title="$t('install.app')" @click="onInstallBtnClick" />
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- 主视图 -->
  <app-main>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </app-main>

  <!-- 底部导航栏 -->
  <v-bottom-navigation
    v-if="xs"
    grow
    color="primary"
    mandatory
    border="t"
    :elevation="0"
    selected-class="noActivatedTransparency"
  >
    <v-btn v-for="item in pages" :key="item.name" :to="{ name: item.name }" :disabled="item.disabled" replace>
      <v-icon>{{ $route.name === item.name ? item.activeIcon : item.icon }}</v-icon>
      {{ item.title }}
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped></style>
