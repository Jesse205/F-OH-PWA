<script lang="ts" setup>
import { PATH_API_ALL_APP, PATH_API_HOME } from '@/constants/urls'
import type { PreferredMetadata } from '@/preferences/app'
import { watchImmediate } from '@vueuse/core'
import { computed, ref } from 'vue'
defineProps<{
  mode: 'create' | 'edit'
}>()

const dialogVisibleModel = defineModel<boolean>()
const metadataModel = defineModel<PreferredMetadata | undefined>('metadata')
const defaultMetadata: PreferredMetadata = {
  name: '',
  description: '',
  api: {
    base: '',
  },
  enabled: true,
  version: 'v1',
}
const metadata = ref<PreferredMetadata>(defaultMetadata)

watchImmediate(dialogVisibleModel, (isDialogVisible) => {
  if (isDialogVisible) {
    const originMetadata = metadataModel.value ?? defaultMetadata
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

function emitAndCloseDialog() {
  if (metadataModel.value) {
    Object.assign(metadataModel.value, metadata.value)
  }

  closeDialog()
}

const rules = {
  required: (value: string) => Boolean(value) || 'Field is required',
}
</script>

<template>
  <v-dialog v-model="dialogVisibleModel">
    <v-card :title="mode">
      <v-card-text class="text-fields">
        <v-text-field v-model="metadata.name" :label="'* Name'" :rules="[rules.required]" />
        <v-text-field v-model="metadata.description" :label="'Description'" />
        <v-select v-model="metadataVersion" label="Version" :items="['v1']" />
        <v-text-field v-model="metadata.api.base" :label="'* ' + $t('apiUrl')" :rules="[rules.required]" />
        <v-text-field v-model="metadata.api.baseOrigin" :label="$t('apiUrl') + '(Origin)'" />
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
        <v-btn :text="$t('action.cancel')" @click="closeDialog" />
        <v-btn :text="$t('action.ok')" @click="emitAndCloseDialog" />
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.text-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
