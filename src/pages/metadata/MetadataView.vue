<script lang="ts" setup>
import BackButton from '@/components/appbar/BackButton.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import { useTitle } from '@/composables/title'
import type { PreferredMetadata } from '@/preferences/app'
import { useMetadataStore } from '@/store/metadata'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import MetadataEditorDialog from './components/MetadataEditorDialog.vue'

const { t } = useI18n()

const title = useTitle(computed(() => t('metadataManager')))
const metadataStore = useMetadataStore()

const isCreateMetadataDialogVisible = ref(false)
const currentEditingMetadata = ref<PreferredMetadata>()
const currentEditorMode = ref<'create' | 'edit'>('create')

function showCreateMetadataDialog() {
  isCreateMetadataDialogVisible.value = true
  currentEditorMode.value = 'create'
  currentEditingMetadata.value = undefined
}
function showEditMetadataDialog(metadata: PreferredMetadata) {
  isCreateMetadataDialogVisible.value = true
  currentEditorMode.value = 'edit'
  currentEditingMetadata.value = metadata
}

watch(currentEditingMetadata, (newMetadata, oldMetadata) => {
  console.log(newMetadata)
  if (currentEditorMode.value === 'create' && newMetadata) {
    metadataStore.externalMetadataArray.push(newMetadata)
  } else if (currentEditorMode.value === 'edit' && newMetadata === undefined && oldMetadata !== undefined) {
    console.log(metadataStore.externalMetadataArray.indexOf(oldMetadata))

    metadataStore.externalMetadataArray.splice(metadataStore.externalMetadataArray.indexOf(oldMetadata), 1)
  }
})
</script>

<template>
  <v-layout>
    <v-app-bar>
      <back-button />
      <v-app-bar-title :text="title" />
    </v-app-bar>
    <v-main>
      <app-category-list class="metadata-items ma-4">
        <app-list-category v-if="metadataStore.internalMetadataArray" :subheader="$t('internal')">
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
        <app-list-category v-if="metadataStore.externalMetadataArray" :subheader="$t('external')">
          <v-list-item
            v-for="item in metadataStore.externalMetadataArray"
            :key="item.api.base"
            class="metadata-item"
            :title="item.name"
            @click="showEditMetadataDialog(item)"
          >
            <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ item.api.base }}</v-list-item-subtitle>
            <template #append>
              <v-divider class="append-divider" vertical />
              <v-switch v-model="item.enabled" @click.stop />
            </template>
          </v-list-item>
        </app-list-category>
      </app-category-list>

      <MetadataEditorDialog
        v-model="isCreateMetadataDialogVisible"
        v-model:metadata="currentEditingMetadata"
        :mode="currentEditorMode"
      />
    </v-main>
    <v-fab icon="$floating_add" absolute app appear location="bottom end" @click="showCreateMetadataDialog"></v-fab>
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
.metadata-item {
  &:deep(.v-list-item__append) {
    height: 100%;
  }
}
.append-divider {
  height: 32px;
  align-self: center;
  margin-right: 16px;
}
</style>
