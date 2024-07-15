<script setup lang="ts">
import { ref, useSlots, watch } from 'vue'

const props = defineProps<{
  hint?: string
  placeholder?: string
  label?: string
  type?: string
  title?: string
}>()

const model = defineModel<any>()
const slots = useSlots()
// const emits = defineEmits<(e: 'update:modelValue', modelValue: string) => void>()

const dialogVisible = ref(false)
const editValue = ref('')

watch(dialogVisible, (newValue) => {
  if (newValue) {
    editValue.value = model.value ?? ''
  }
})

function emitValue() {
  model.value = editValue.value
  dialogVisible.value = false
}
</script>

<template>
  <v-list-item link :title="title">
    <template v-if="slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="slots.subtitle" #subtitle>
      <slot name="subtitle" />
    </template>
    <v-dialog v-model="dialogVisible" activator="parent">
      <v-card :title="title">
        <v-card-text class="py-0">
          <v-text-field
            v-model="editValue"
            :hint="hint"
            :persistent-hint="Boolean(hint)"
            :placeholder="placeholder"
            :label="label"
            :type="type"
            hide-details="auto"
            :density="!label ? 'compact' : undefined"
            :single-line="Boolean(label)"
            @keyup.enter="emitValue"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="dialogVisible = false">
            {{ $t('action.cancel') }}
          </v-btn>
          <v-btn variant="text" @click="emitValue">
            {{ $t('action.ok') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>
