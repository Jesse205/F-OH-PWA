<script lang="ts" setup>
import UnsafeBypassChromeGuide from '@/components/guide/UnsafeBypassChromeGuide.vue'
import { ref } from 'vue'

const isGuideDialogVisible = ref(false)
</script>

<template>
  <v-alert icon="$info">
    {{ $t('alert.unsafeApiAndMaybeBlockedByChromeMessage') }}
    <v-btn :text="$t('action.viewGuide')" @click="isGuideDialogVisible = true" />
  </v-alert>
  <v-dialog v-model="isGuideDialogVisible" activator="viewGuideButton">
    <v-card title="Chrome 解决 API 不安全">
      <template #text><UnsafeBypassChromeGuide /></template>
      <template #actions>
        <v-btn :text="$t('action.close')" @click="isGuideDialogVisible = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
