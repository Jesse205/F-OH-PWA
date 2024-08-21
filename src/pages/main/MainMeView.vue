<script setup lang="ts">
import AppListCategory from '@/components/list/AppListCategory.vue'
</script>

<template>
  <v-main>
    <!-- 软件面板 -->
    <app-category-list class="ma-4">
      <app-list-category>
        <v-list-item :title="$t('settings')" prepend-icon="$settings" append-icon="$next" :to="{ name: 'Settings' }" />
        <v-list-item :title="$t('about')" link prepend-icon="$info" append-icon="$next" :to="{ name: 'About' }" />
      </app-list-category>
    </app-category-list>
  </v-main>
</template>
