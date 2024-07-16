<script setup lang="ts">
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
</script>

<template>
  <v-card class="AppCard">
    <div class="app-item">
      <v-img class="app-icon" src="@/assets/images/icon.svg" alt="" />
      <h2 class="app-name text-subtitle-1">{{ appStore.appName }}</h2>
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
  padding: 16px;
}

.app-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.app-icon {
  width: 72px;
  height: 72px;
  font-size: 0;
}

.app-name {
  margin-top: 8px;
  vertical-align: baseline;
}
</style>
