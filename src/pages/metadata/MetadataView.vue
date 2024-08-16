<script lang="ts" setup>
import BackButton from '@/components/appbar/BackButton.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import { useTitle } from '@/composables/title'
import { getInternalMetadataArray } from '@/data/metadata'
import { usePreferredMetadata } from '@/preferences/app'
import { computed } from 'vue'

const title = useTitle(computed(() => 'Metadata Manager'))
const internalMetadataArray = getInternalMetadataArray()
const metadataArray = usePreferredMetadata()
/* repositories.value.push({
  name: 'F-OH',

}) */
</script>

<template>
  <v-layout>
    <v-app-bar>
      <back-button />
      <v-app-bar-title :text="title" />
    </v-app-bar>
    <app-main>
      <app-category-list class="metadata-items ma-4">
        <app-list-category :subheader="'Internal'">
          <v-list-item
            v-for="item in internalMetadataArray"
            :key="item.api.base"
            class="metadata-item"
            :title="item.name"
          >
            <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ item.api.base }}</v-list-item-subtitle>
          </v-list-item>
        </app-list-category>
        <app-list-category :subheader="'Others'">
          <v-list-item v-for="item in metadataArray" :key="item.api.base" class="metadata-item" :title="item.name">
            <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ item.api.base }}</v-list-item-subtitle>
            <template #append>
              <v-switch v-model="item.enabled" tabindex="-1" />
            </template>
          </v-list-item>
        </app-list-category>
      </app-category-list>
      <template #root> </template>
    </app-main>
    <!-- <v-fab class="ms-4 mb-4" location="bottom start" app absolute appear></v-fab> -->
  </v-layout>
</template>

<style lang="scss" scoped>
@mixin column($count: number) {
  .metadata-items {
    --columns: #{$count};
  }
  .metadata-item:nth-last-child(#{$count})::before {
    border-bottom-width: 0;
  }
}
</style>
