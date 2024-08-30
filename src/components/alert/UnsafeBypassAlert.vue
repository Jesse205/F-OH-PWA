<script lang="ts" setup>
import { ref } from 'vue'

import UnsafeBypassChromeGuide from '@/components/guide/UnsafeBypassChromeGuide.vue'

const isGuideDialogVisible = ref(false)
const guide = ref<InstanceType<typeof UnsafeBypassChromeGuide>>()
</script>

<template>
  <v-alert v-bind="$attrs" icon="$info">
    {{ $t('alert.unsafeApiAndMaybeBlockedByChromeMessage') }}
    <template #append>
      <v-btn :text="$t('action.viewGuide')" @click="isGuideDialogVisible = true" />
    </template>
  </v-alert>
  <v-dialog v-model="isGuideDialogVisible">
    <v-card :title="guide?.title">
      <template #text><UnsafeBypassChromeGuide ref="guide" /></template>
      <template #actions>
        <v-btn :text="$t('action.close')" @click="isGuideDialogVisible = false" />
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
