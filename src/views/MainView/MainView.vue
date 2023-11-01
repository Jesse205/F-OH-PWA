<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import { useDisplay } from 'vuetify'
import AppMain from '@/components/AppMain.vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@/events/title'
import { URL_UPLOAD } from '@/data/constants'
import { useHomeNavigation } from '@/events/navigation'
import BackButton from '@/components/BackButton.vue'

const { pages } = useHomeNavigation()

const route = useRoute()
const homeTitle = ref<string | null>(null)

useTitle(homeTitle)

watchEffect(() => {
  for (const item of pages.value) {
    if (item.name === route.name) {
      homeTitle.value = item.title
      break
    }
  }
})

const { xs } = useDisplay()

// PWA
const installBtnVisible = inject<boolean>('installBtnVisible')
const onInstallBtnClick = inject<() => void>('onInstallBtnClick')
</script>

<template>
  <!-- 应用栏 -->
  <v-app-bar flat border="b">
    <back-button />
    <!-- <v-app-bar-nav-icon v-if="!mobile" @click.stop="drawer = !drawer" /> -->
    <v-app-bar-title>{{ homeTitle }}</v-app-bar-title>
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
        <!-- <v-list-item :title="$t('upload.app')" :to="{ name: 'Upload' }" /> -->
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
