<script lang="ts" setup>
import type { DonatePlatform } from '@/ts/interfaces/donate.interfaces'
import { parseI18n } from '@/util/i18n'
import { ref } from 'vue'
defineProps<{
  platforms: DonatePlatform[]
  name: string
  summary: string
}>()

const selected = ref<number>(0)
</script>

<template>
  <v-card class="DonateCard">
    <v-tabs v-model="selected">
      <v-tab v-for="(platform, index) in platforms" :key="platform.key" :value="index" :color="platform.color">
        {{ parseI18n(platform.name, $t) }}
      </v-tab>
    </v-tabs>
    <v-divider />
    <v-img class="donate-card__image" cover :src="platforms[selected].image" data-allow-drag />
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
.DonateCard {
  margin: 8px;
  width: 100%;
  max-width: 360px;

  &__image,
  &__content-btn {
    width: 100%;
    aspect-ratio: 1;
  }
  &__content-btn {
    padding: 24px;
    &.v-btn {
      height: unset;
      display: flex;
      :deep(.v-btn__content) {
        width: 100%;
        height: 100%;
      }
    }
    &__description {
      width: 100%;
      white-space: pre-line;
      text-align: center;

      * {
        max-width: 100%;
        overflow-wrap: break-word;
      }
      &__icon {
        width: 96px;
        height: 96px;
        flex: none;
      }
      &__click-hint {
        position: absolute;
        bottom: 16px;
        left: 0;
        right: 0;
      }
    }
  }
}
</style>
