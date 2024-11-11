<script lang="ts" setup>
import { watchImmediate } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import { type SubmitEventPromise, useDisplay } from 'vuetify'
import type { VTextField } from 'vuetify/components'

import DialogActionsTemplate from '@/components/dialog/DialogActionsTemplate.vue'
import { PATH_API_ALL_APP, PATH_API_HOME } from '@/constants/urls'
import { defaultPreferredMetadataSource, type MetadataSourceData } from '@/data/metadataSource'
import { useRequired } from '@/utils/rules'

defineProps<{
  mode: 'create' | 'edit'
}>()
const emits = defineEmits<{
  delete: []
}>()

const { xs } = useDisplay()

const isDialogVisible = defineModel<boolean>()
const originSource = defineModel<MetadataSourceData | undefined>('source')
const editingSource = ref<MetadataSourceData>(defaultPreferredMetadataSource)

watchImmediate(isDialogVisible, (isDialogVisible) => {
  if (isDialogVisible) {
    editingSource.value = cloneDeep(originSource.value ?? defaultPreferredMetadataSource)
  }
})

function closeDialog() {
  isDialogVisible.value = false
}

async function emitAndCloseDialog(event: SubmitEventPromise) {
  const validationResult = await event
  if (!validationResult.valid) {
    return
  }
  const clonedSource = cloneDeep(editingSource.value)
  if (originSource.value) {
    Object.assign(originSource.value, clonedSource)
  } else {
    originSource.value = clonedSource
  }
  closeDialog()
}

function deleteAndCloseDialog() {
  emits('delete')
  closeDialog()
}

const rules = {
  required: useRequired(),
}
</script>

<template>
  <app-dialog
    v-model="isDialogVisible"
    :form="true"
    :fullscreen="xs"
    :title="mode === 'edit' ? $t('editMetadataSource') : $t('createMetadataSource')"
    @submit.prevent="emitAndCloseDialog"
  >
    <v-card-text class="text-fields">
      <v-text-field v-model="editingSource.name" :label="$t('field.label.name_required')" :rules="[rules.required]" />
      <v-text-field v-model="editingSource.description" :label="$t('field.label.description')" />
      <v-select v-model="editingSource.version" :label="$t('field.label.version')" :items="['v1']" />
      <v-text-field
        v-model="editingSource.api.base"
        :label="$t('field.label.apiUrl_required')"
        :rules="[rules.required]"
      />
      <v-text-field
        v-model="editingSource.api.baseOrigin"
        :label="$t('field.label.originApiUrl')"
        :hint="$t('field.hint.originApiUrl')"
        persistent-hint
      />
      <v-text-field
        v-model="editingSource.api.home"
        :label="$t('field.label.homeDataPath')"
        :placeholder="PATH_API_HOME"
        persistent-placeholder
      />
      <v-text-field
        v-model="editingSource.api.apps"
        :label="$t('field.label.appsDataPath')"
        :placeholder="PATH_API_ALL_APP"
        persistent-placeholder
      />
    </v-card-text>

    <template #positive>
      <v-btn :text="mode === 'edit' ? $t('action.update') : $t('action.create')" type="submit" />
    </template>
    <template #negative>
      <v-btn :text="$t('action.cancel')" @click="closeDialog" />
    </template>
    <template #neutral>
      <v-btn v-if="mode === 'edit'" :text="$t('action.delete')" @click="deleteAndCloseDialog" />
    </template>
  </app-dialog>
</template>

<style lang="scss" scoped>
.text-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  > * {
    flex-grow: 0;
  }
}
</style>
