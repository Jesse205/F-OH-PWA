<script lang="ts" setup>
import BackButton from '@/components/appbar/BackButton.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import { useTitle } from '@/composables/title'
import { useMetadataStore } from '@/store/metadata'
import { computed } from 'vue'

const title = useTitle(computed(() => 'Metadata Manager'))
const metadataStore = useMetadataStore()
</script>

<template>
  <v-layout>
    <v-app-bar>
      <back-button />
      <v-app-bar-title :text="title" />
    </v-app-bar>
    <app-main>
      <app-category-list class="metadata-items ma-4">
        <app-list-category v-if="metadataStore.internalMetadataArray" :subheader="'Internal'">
          <v-list-item
            v-for="item in metadataStore.internalMetadataArray"
            :key="item.api.base"
            class="metadata-item"
            :title="item.name"
            @click="item.enabled = !item.enabled"
          >
            <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ item.api.base }}</v-list-item-subtitle>
            <template #append>
              <v-switch v-model="item.enabled" tabindex="-1" />
            </template>
          </v-list-item>
        </app-list-category>
        <app-list-category v-if="metadataStore.externalMetadataArray" :subheader="'External'">
          <v-list-item
            v-for="item in metadataStore.externalMetadataArray"
            :key="item.api.base"
            class="metadata-item"
            :title="item.name"
            @click="item.enabled = !item.enabled"
          >
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
