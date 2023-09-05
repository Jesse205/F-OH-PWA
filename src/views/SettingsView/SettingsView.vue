<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'

import { useTitle } from '@/events/title';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
useTitle(t('settings.name'))

const version = __VERSION__
</script>

<template>
  <v-app-bar flat border="b">
    <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
    <v-app-bar-title>{{ $t('settings.name') }}</v-app-bar-title>
  </v-app-bar>
  <app-main>
    <v-container class="container">
      <v-list lines="two" active-class="noActivatedOverlay">
        <!-- 项目展示 -->
        <!-- <v-list-subheader>{{ $t('project.showcase.name') }}</v-list-subheader> -->
        <!-- 应用 -->
        <!-- <v-divider></v-divider> -->
        <v-list-subheader>{{ $t('app.name') }}</v-list-subheader>
        <!-- 关于 -->
        <v-list-item prepend-icon="mdi-information-outline" :title="$t('about.name')" :subtitle="version"
          :to="{ name: 'About' }" append-icon="mdi-chevron-right">
        </v-list-item>
      </v-list>
    </v-container>
  </app-main>
</template>

<style scoped>
.container {
  padding: 0;
}
</style>
