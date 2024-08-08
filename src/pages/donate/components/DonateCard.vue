<script lang="ts" setup>
import type { DonatePlatform } from '@/data/donate'
import { parseI18n } from '@/utils/i18n'
import { ref } from 'vue'

defineProps<{
  platforms: DonatePlatform[]
  name: string
  summary: string
}>()

const reallySelected = ref<number>(0)
</script>

<template>
  <v-card class="donate-card">
    <v-tabs v-model="reallySelected">
      <v-tab v-for="(platform, index) in platforms" :key="platform.key" :value="index" :color="platform.color">
        {{ parseI18n(platform.name, $t) }}
      </v-tab>
    </v-tabs>
    <v-divider />
    <div class="content">
      <slot :selected-key="platforms[reallySelected].key">
        <v-img cover :src="platforms[reallySelected].image" data-allow-drag />
      </slot>
    </div>
    <v-divider />
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">{{ parseI18n(name, $t) }}</div>
        <div class="text-caption">{{ parseI18n(summary, $t) }}</div>
      </div>
    </v-card-item>
  </v-card>
</template>

<style lang="scss" scoped>
.donate-card {
  margin: 8px;
  width: 100%;
  max-width: 360px;

  .content {
    width: 100%;
    aspect-ratio: 1;
  }
}
</style>
