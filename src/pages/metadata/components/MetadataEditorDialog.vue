<script lang="ts" setup>
import DialogActionsTemplate from '@/components/dialog/DialogActionsTemplate.vue'
import { PATH_API_ALL_APP, PATH_API_HOME } from '@/constants/urls'
import { defaultPreferredMetadata } from '@/data/metadata'
import type { PreferredMetadata } from '@/preferences/app'
import { watchImmediate } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { SubmitEventPromise } from 'vuetify'
import type { VTextField } from 'vuetify/components'

defineProps<{
  mode: 'create' | 'edit'
}>()

const dialogVisibleModel = defineModel<boolean>()
const metadataModel = defineModel<PreferredMetadata | undefined>('metadata')
const metadata = ref<PreferredMetadata>(defaultPreferredMetadata)

watchImmediate(dialogVisibleModel, (isDialogVisible) => {
  if (isDialogVisible) {
    const originMetadata = metadataModel.value ?? defaultPreferredMetadata
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
  if (metadataModel.value) {
    Object.assign(metadataModel.value, metadata.value)
  } else {
    metadataModel.value = metadata.value
  }
  closeDialog()
}

function deleteAndCloseDialog() {
  metadataModel.value = undefined
  closeDialog()
}

const rules = {
  required: (value: string) => Boolean(value) || 'Field is required',
}
</script>

<template>
  <v-dialog v-model="dialogVisibleModel">
    <v-form @submit.prevent="emitAndCloseDialog">
      <v-card :title="mode === 'edit' ? $t('editMetadata') : $t('createMetadata')">
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
            :label="'Home path'"
            :placeholder="PATH_API_HOME"
            persistent-placeholder
          />
          <v-text-field
            v-model="metadata.api.apps"
            :label="'Apps path'"
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
