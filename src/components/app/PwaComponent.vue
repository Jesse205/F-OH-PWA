<script setup lang="ts">
import { usePwaStore } from '@/store/pwa'
import type { BeforeInstallPrompt } from '@/ts/interfaces/pwa.interfaces'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

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

// Install button
let deferredPrompt: BeforeInstallPrompt | null = null
function onInstallBtnClick() {
  if (deferredPrompt === null) return
  pwaStore.installBtnVisible = false
  deferredPrompt.prompt()
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt')
      pwaStore.installBtnVisible = false
    } else {
      console.log('User dismissed the A2HS prompt')
      pwaStore.installBtnVisible = true
    }
  })
}
pwaStore.onInstallBtnClick = onInstallBtnClick

function onBeforeInstallPrompt(prompt: BeforeInstallPrompt) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  prompt.preventDefault()
  pwaStore.installBtnVisible = true
  deferredPrompt = prompt
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
