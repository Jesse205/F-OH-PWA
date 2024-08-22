<script lang="ts" setup>
import BackButton from '@/components/appbar/BackButton.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import { useTitle } from '@/composables/title'
import type { PreferredMetadataSource } from '@/preferences/app'
import { useMetadataSourceStore } from '@/store/metadataSource'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import MetadataSourceEditorDialog from './components/MetadataSourceEditorDialog.vue'

const { t } = useI18n()

const title = useTitle(computed(() => t('metadataSourceManager')))
const metadataSourceStore = useMetadataSourceStore()

const isCreateMetadataDialogVisible = ref(false)
const currentEditingSource = ref<PreferredMetadataSource>()
const currentEditorMode = ref<'create' | 'edit'>('create')

function showCreateMetadataSourceDialog() {
  isCreateMetadataDialogVisible.value = true
  currentEditorMode.value = 'create'
  currentEditingSource.value = undefined
}
function showEditMetadataSourceDialog(metadata: PreferredMetadataSource) {
  isCreateMetadataDialogVisible.value = true
  currentEditorMode.value = 'edit'
  currentEditingSource.value = metadata
}

watch(currentEditingSource, (newMetadata, oldMetadata) => {
  console.log(newMetadata)
  if (currentEditorMode.value === 'create' && newMetadata) {
    metadataSourceStore.externalMetadataArray.push(newMetadata)
  } else if (currentEditorMode.value === 'edit' && newMetadata === undefined && oldMetadata !== undefined) {
    console.log(metadataSourceStore.externalMetadataArray.indexOf(oldMetadata))

    metadataSourceStore.externalMetadataArray.splice(metadataSourceStore.externalMetadataArray.indexOf(oldMetadata), 1)
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
        <app-list-category v-if="metadataSourceStore.internalMetadataArray.length > 0" :subheader="$t('internal')">
          <v-list-item
            v-for="item in metadataSourceStore.internalMetadataArray"
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
        <app-list-category v-if="metadataSourceStore.externalMetadataArray.length > 0" :subheader="$t('external')">
          <v-list-item
            v-for="item in metadataSourceStore.externalMetadataArray"
            :key="item.api.base"
            class="metadata-item"
            :title="item.name"
            @click="showEditMetadataSourceDialog(item)"
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

      <MetadataSourceEditorDialog
        v-model="isCreateMetadataDialogVisible"
        v-model:source="currentEditingSource"
        :mode="currentEditorMode"
      />
    </v-main>
    <v-fab icon="$floating_add" absolute app appear location="bottom end" @click="showCreateMetadataSourceDialog"></v-fab>
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
