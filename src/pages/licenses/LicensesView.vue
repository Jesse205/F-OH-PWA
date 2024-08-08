<script lang="ts" setup>
import BackButton from '@/components/appbar/BackButton.vue'
import AppMain from '@/components/AppMain.vue'
import { projects } from '@/data/licenses'
</script>

<template>
  <v-layout>
    <v-app-bar>
      <back-button />
      <v-app-bar-title>{{ $t('term.openSourceLicenses') }}</v-app-bar-title>
    </v-app-bar>
    <app-main>
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
    </app-main>
  </v-layout>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}
.project-item {
  margin: 8px;
  display: flex;
  flex-direction: column;
  flex-basis: 240px;
  flex-grow: 1;
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
