<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { usePwaStore } from '@/store/pwa'

const pwaStore = usePwaStore()
const { needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true })
const reloadDialogVisible = ref(false)

watch(needRefresh, (newValue) => {
  if (newValue) reloadDialogVisible.value = true
})

function updateAndReload() {
  updateServiceWorker()
  reloadDialogVisible.value = false
}

function dismissReloadDialog() {
  reloadDialogVisible.value = false
}

function onBeforeInstallPrompt(event: BeforeInstallPromptEvent) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault()
  pwaStore.installBtnVisible = true
  pwaStore.promptEvent = event
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt as EventListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt as EventListener)
})
</script>

<template>
  <v-dialog v-model="reloadDialogVisible">
    <v-card :title="$t('updateApp')">
      <v-card-text>{{ $t('updateAppMessage') }} </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="dismissReloadDialog">
          {{ $t('action.cancel') }}
        </v-btn>
        <v-btn variant="text" @click="updateAndReload">
          {{ $t('action.ok') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
