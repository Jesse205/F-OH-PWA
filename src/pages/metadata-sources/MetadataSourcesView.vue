<script lang="ts" setup>
import { reactivePick } from '@vueuse/core'
import { computed, ref, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import BackButton from '@/components/appbar/BackButton.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import { useTitle } from '@/composables/title'
import type { MetadataSourceData } from '@/data/metadataSource'
import { useMetadataSourceStore } from '@/store/metadataSource'
import { removeElementFromArray } from '@/utils/array'

import MetadataSourceItem from './components/list/MetadataSourceItem.vue'
import MetadataSourceEditorDialog from './components/MetadataSourceEditorDialog.vue'

const { t } = useI18n()

const title = useTitle(computed(() => t('metadataSourcesManager')))

const sourceStore = useMetadataSourceStore()
const { internalSourceDataArray, externalSourceDataArray } = toRefs(
  reactivePick(sourceStore, 'internalSourceDataArray', 'externalSourceDataArray'),
)

const isEditorVisible = ref(false)
const editingSource = ref<MetadataSourceData>()
const editorMode = ref<'create' | 'edit'>('create')

function showCreateSourceDialog() {
  isEditorVisible.value = true
  editorMode.value = 'create'
  editingSource.value = undefined
}

function showEditSourceDialog(metadata: MetadataSourceData) {
  isEditorVisible.value = true
  editorMode.value = 'edit'
  editingSource.value = metadata
}

function deleteSource(metadataSource: MetadataSourceData) {
  removeElementFromArray(sourceStore.externalSourceDataArray, metadataSource)
}

function updateSource(newSource?: MetadataSourceData) {
  if (newSource && editorMode.value === 'create') {
    externalSourceDataArray.value.push(newSource)
  }
}

watch(isEditorVisible, (isEditorVisible) => {
  if (!isEditorVisible) {
    editingSource.value = undefined
  }
})
</script>

<template>
  <app-page>
    <v-app-bar>
      <back-button />
      <v-app-bar-title :text="title" />
    </v-app-bar>
    <v-main scrollable>
      <app-list un-margin="4">
        <app-list-category :subheader="$t('internal')">
          <MetadataSourceItem
            v-for="(item, index) in internalSourceDataArray"
            :key="item.api.base"
            v-model:enabled="item.enabled"
            :name="item.name"
            :description="item.description"
            :api-url="item.api.base"
            :editable="false"
            :lastInVertical="index >= internalSourceDataArray.length - 1"
          />
        </app-list-category>
        <app-list-category :subheader="$t('external')">
          <MetadataSourceItem
            v-for="(item, index) in externalSourceDataArray"
            :key="item.api.base"
            v-model:enabled="item.enabled"
            :name="item.name"
            :description="item.description"
            :api-url="item.api.base"
            :editable="true"
            @edit="showEditSourceDialog(item)"
            :lastInVertical="index >= externalSourceDataArray.length - 1"
          />
        </app-list-category>
      </app-list>

      <MetadataSourceEditorDialog
        v-model="isEditorVisible"
        :source="editingSource"
        :mode="editorMode"
        @delete="editingSource && deleteSource(editingSource)"
        @update:source="updateSource"
      />
    </v-main>
    <v-fab icon="$floating_add" app absolute location="bottom end" @click="showCreateSourceDialog" />
  </app-page>
</template>

<style lang="scss" scoped></style>
