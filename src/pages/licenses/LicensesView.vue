<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import BackButton from '@/components/appbar/BackButton.vue'
import { useTitle } from '@/composables/title'
import { projects } from '@/data/licenses'
const { t } = useI18n()
const title = useTitle(computed(() => t('term.openSourceLicenses')))
</script>

<template>
  <app-page>
    <v-app-bar>
      <back-button />
      <v-app-bar-title :text="title" />
    </v-app-bar>
    <v-main scrollable>
      <div class="container">
        <v-card v-for="item in projects" :key="item.key" class="project-item" :href="item.url" target="_blank">
          <v-card-item>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle>{{ item.vendor }}</v-card-subtitle>
          </v-card-item>
          <v-card-text class="project-item__text">{{ item.summary }}</v-card-text>
          <v-spacer />
          <div class="project-item__footer">
            <span>{{ item.license }}</span>
            <v-spacer />
            <v-icon size="20" icon="$openInNew" />
          </div>
        </v-card>
      </div>
    </v-main>
  </app-page>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  padding: 16px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.project-item {
  display: flex;
  flex-direction: column;
  &__text {
    padding-bottom: 0;
  }
  &__footer {
    display: flex;
    padding: 1rem;
    opacity: var(--v-medium-emphasis-opacity);
    align-items: center;
  }
}
</style>
