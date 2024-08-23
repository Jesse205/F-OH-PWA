<script lang="ts" setup>
import BackButton from '@/components/appbar/BackButton.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import { useTitle } from '@/composables/title'
import type { MetadataSourceData } from '@/data/metadataSource'
import { useMetadataSourceStore } from '@/store/metadataSource'
import { removeElementFromArray } from '@/utils/array'
import { reactivePick } from '@vueuse/core'
import { computed, ref, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import MetadataSourceEditorDialog from './components/MetadataSourceEditorDialog.vue'
import MetadataSourceItem from './components/list/MetadataSourceItem.vue'

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
  <v-layout>
    <v-app-bar>
      <back-button />
      <v-app-bar-title :text="title" />
    </v-app-bar>
    <v-main>
      <app-category-list class="metadata-items ma-4">
        <app-list-category :subheader="$t('internal')">
          <MetadataSourceItem
            v-for="item in internalSourceDataArray"
            :key="item.api.base"
            v-model:enabled="item.enabled"
            :name="item.name"
            :description="item.description"
            :api-url="item.api.base"
            :editable="false"
          />
        </app-list-category>
        <app-list-category :subheader="$t('external')">
          <MetadataSourceItem
            v-for="item in externalSourceDataArray"
            :key="item.api.base"
            v-model:enabled="item.enabled"
            :name="item.name"
            :description="item.description"
            :api-url="item.api.base"
            :editable="true"
            @edit="showEditSourceDialog(item)"
          />
        </app-list-category>
      </app-category-list>

      <MetadataSourceEditorDialog
        v-model="isEditorVisible"
        :source="editingSource"
        :mode="editorMode"
        @delete="editingSource && deleteSource(editingSource)"
        @update:source="updateSource"
      />
    </v-main>
    <v-fab icon="$floating_add" absolute app location="bottom end" @click="showCreateSourceDialog" />
  </v-layout>
</template>

<style lang="scss" scoped></style>
