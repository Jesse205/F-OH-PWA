<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: any
  hint?: string
}>()
const emits = defineEmits<(e: 'update:modelValue', modelValue: string) => void>()
const dialogVisible = ref(false)
const editValue = ref('')

watch(dialogVisible, (newValue) => {
  if (newValue) {
    editValue.value = props.modelValue ?? ''
  }
})

function applyValue() {
  emits('update:modelValue', editValue.value)
  dialogVisible.value = false
}
</script>

<template>
  <v-list-item link>
    <v-dialog v-model="dialogVisible" width="420" activator="parent" transition="fade-transition">
      <v-card :title="$t('token.name')">
        <v-card-text class="py-0">
          <v-text-field v-model="editValue" active :hint="hint" persistent-hint @keyup.enter="applyValue" />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="dialogVisible = false"> {{ $t('cancel.name') }} </v-btn>
          <v-btn variant="text" @click="applyValue">
            {{ $t('ok.name') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<!-- <style scoped></style> -->
