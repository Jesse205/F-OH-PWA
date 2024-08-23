<script lang="ts" setup>
import DialogActionsTemplate from '@/components/dialog/DialogActionsTemplate.vue'
import { PATH_API_ALL_APP, PATH_API_HOME } from '@/constants/urls'
import { defaultPreferredMetadataSource, type MetadataSourceData } from '@/data/metadataSource'
import { useRequired } from '@/utils/rules'
import { watchImmediate } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { SubmitEventPromise } from 'vuetify'
import type { VTextField } from 'vuetify/components'

defineProps<{
  mode: 'create' | 'edit'
}>()

const dialogVisibleModel = defineModel<boolean>()
const sourceModel = defineModel<MetadataSourceData | undefined>('source')
const metadata = ref<MetadataSourceData>(defaultPreferredMetadataSource)

watchImmediate(dialogVisibleModel, (isDialogVisible) => {
  if (isDialogVisible) {
    const originMetadata = sourceModel.value ?? defaultPreferredMetadataSource
    metadata.value = {
      name: originMetadata.name,
      description: originMetadata.description,
      api: {
        base: originMetadata.api.base,
        baseOrigin: originMetadata.api.baseOrigin,
        home: originMetadata.api.home,
        apps: originMetadata.api.apps,
      },
      enabled: originMetadata.enabled,
      version: originMetadata.version,
    }
  }
})
const metadataVersion = computed({
  get() {
    return metadata.value.version
  },
  set(value) {
    metadata.value.version = value
  },
})

function closeDialog() {
  dialogVisibleModel.value = false
}

async function emitAndCloseDialog(event: SubmitEventPromise) {
  const validationResult = await event
  if (!validationResult.valid) {
    return
  }
  if (sourceModel.value) {
    Object.assign(sourceModel.value, metadata.value)
  } else {
    sourceModel.value = metadata.value
  }
  closeDialog()
}

function deleteAndCloseDialog() {
  sourceModel.value = undefined
  closeDialog()
}

const rules = {
  required: useRequired(),
}
</script>

<template>
  <v-dialog v-model="dialogVisibleModel">
    <v-form @submit.prevent="emitAndCloseDialog">
      <v-card :title="mode === 'edit' ? $t('editMetadataSource') : $t('createMetadataSource')">
        <v-card-text class="text-fields">
          <v-text-field v-model="metadata.name" :label="$t('field.label.name_required')" :rules="[rules.required]" />
          <v-text-field v-model="metadata.description" :label="$t('field.label.description')" />
          <v-select v-model="metadataVersion" :label="$t('field.label.version')" :items="['v1']" />
          <v-text-field
            v-model="metadata.api.base"
            :label="$t('field.label.apiUrl_required')"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="metadata.api.baseOrigin"
            :label="$t('field.label.originApiUrl')"
            :hint="$t('field.hint.originApiUrl')"
            persistent-hint
          />
          <v-text-field
            v-model="metadata.api.home"
            :label="$t('field.label.homeDataPath')"
            :placeholder="PATH_API_HOME"
            persistent-placeholder
          />
          <v-text-field
            v-model="metadata.api.apps"
            :label="$t('field.label.appsDataPath')"
            :placeholder="PATH_API_ALL_APP"
            persistent-placeholder
          />
        </v-card-text>
        <template #actions>
          <DialogActionsTemplate>
            <template #positive>
              <v-btn :text="mode === 'edit' ? $t('action.update') : $t('action.create')" type="submit" />
            </template>
            <template #negative>
              <v-btn :text="$t('action.cancel')" @click="closeDialog" />
            </template>
            <template #neutral>
              <v-btn v-if="mode === 'edit'" :text="$t('action.delete')" @click="deleteAndCloseDialog" />
            </template>
          </DialogActionsTemplate>
        </template>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style lang="scss" scoped>
.text-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
