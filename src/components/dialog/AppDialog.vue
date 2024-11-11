<script lang="ts" setup>
import { toRefs } from 'vue'
import { useDefaults, type SubmitEventPromise } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'

interface Props {
  actionButtonLayout?: 'fill' | 'side'
  form?: boolean
  title?: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  actionButtonLayout: 'side',
})

const { actionButtonLayout } = toRefs(useDefaults(props))

const emits = defineEmits<{
  submit: [e: SubmitEventPromise]
}>()

function onSubmit(e: SubmitEventPromise) {
  emits('submit', e)
}
</script>

<template>
  <v-dialog>
    <component :is="form ? VForm : undefined" @submit="onSubmit">
      <v-card>
        <v-card-item>
          <v-card-title v-if="title || $slots.title">
            <slot name="title">{{ title }}</slot>
          </v-card-title>
        </v-card-item>
        <v-card-text>
          <slot name="message">{{ message }}</slot>
        </v-card-text>
        <slot />
        <v-card-actions>
          <template v-if="actionButtonLayout === 'side'">
            <slot name="neutral" />
            <v-spacer />
            <slot name="negative" />
            <slot name="positive" />
          </template>
          <template v-else>
            <slot name="negative" />
            <slot name="neutral" />
            <slot name="positive" />
          </template>
        </v-card-actions>
      </v-card>
    </component>
  </v-dialog>
</template>
