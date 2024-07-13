<script setup lang="ts">
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
</script>

<template>
  <v-card class="AppCard pa-1">
    <div class="app-item">
      <v-img class="app-icon ma-1" src="@/assets/images/icon.svg" alt="" />
      <h2 class="text-subtitle-1 ma-1">{{ appStore.appName }}</h2>
    </div>
  </v-card>
</template>

<style scoped>
.AppCard {
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.2s;
  transition-property: box-shadow, transform, visibility, width, height, left, right, top, bottom;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.app-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.app-icon {
  width: 70px;
  height: 72px;
  padding: 4px;
  font-size: 0;
}
</style>
