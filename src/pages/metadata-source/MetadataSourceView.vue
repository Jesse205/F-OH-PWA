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

const title = useTitle(computed(() => t('metadataSourceManager')))

const sourceStore = useMetadataSourceStore()
const { internalSourceDataArray, externalSourceDataArray } = toRefs(
  reactivePick(sourceStore, 'internalSourceDataArray', 'externalSourceDataArray'),
)

const isMetadataSourceEditorVisible = ref(false)
const currentEditingSource = ref<MetadataSourceData>()
const currentEditorMode = ref<'create' | 'edit'>('create')

function showCreateMetadataSourceDialog() {
  isMetadataSourceEditorVisible.value = true
  currentEditorMode.value = 'create'
  currentEditingSource.value = undefined
}

function showEditMetadataSourceDialog(metadata: MetadataSourceData) {
  isMetadataSourceEditorVisible.value = true
  currentEditorMode.value = 'edit'
  currentEditingSource.value = metadata
}

watch(currentEditingSource, (newSource, oldSource) => {
  if (currentEditorMode.value === 'create' && newSource !== undefined) {
    sourceStore.externalSourceDataArray.push(newSource)
  } else if (currentEditorMode.value === 'edit' && newSource === undefined && oldSource !== undefined) {
    // 编辑模式下，如果 newSource 变为 undefined，表示删除该元数据源
    removeElementFromArray(sourceStore.externalSourceDataArray, oldSource)
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
            @edit="showEditMetadataSourceDialog(item)"
          />
        </app-list-category>
      </app-category-list>

      <MetadataSourceEditorDialog
        v-model="isMetadataSourceEditorVisible"
        v-model:source="currentEditingSource"
        :mode="currentEditorMode"
      />
    </v-main>
    <v-fab icon="$floating_add" absolute app appear location="bottom end" @click="showCreateMetadataSourceDialog" />
  </v-layout>
</template>

<style lang="scss" scoped></style>
