<script setup lang="ts">
import { usePwa } from '@/composables/pwa';
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { ref, watch } from 'vue'
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

// PWA
usePwa()
</script>

<template>
  <v-dialog v-model="reloadDialogVisible">
    <v-card :title="$t('update.name')">
      <v-card-text> 应用有更新，需要重新加载 </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="dismissReloadDialog"> {{ $t('cancel.name') }} </v-btn>
        <v-btn variant="text" @click="updateAndReload">
          {{ $t('ok.name') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
