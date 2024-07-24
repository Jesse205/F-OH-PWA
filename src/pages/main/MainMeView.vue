<script setup lang="ts">
import AppListCategory from '@/components/list/AppListCategory.vue'
</script>

<template>
  <app-main>
    <v-container class="py-0">
      <!-- 软件面板 -->
      <app-category-list class="my-4">
        <app-list-category>
          <v-list-item
            :title="$t('settings')"
            prepend-icon="$settings"
            append-icon="$next"
            :to="{ name: 'Settings' }"
          />
          <v-list-item :title="$t('about')" link prepend-icon="$info" append-icon="$next" :to="{ name: 'About' }" />
        </app-list-category>
      </app-category-list>
    </v-container>
  </app-main>
</template>
