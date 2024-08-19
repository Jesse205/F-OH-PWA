<script lang="ts" setup>
import { AxiosError } from 'axios'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps<{
  error?: Error | unknown
}>()

const errorTitle = computed<string | undefined>(() => {
  if (props.error instanceof AxiosError) {
    return t('error.network')
  } else if (props.error instanceof Error) {
    return props.error.message
  } else if (props.error) {
    return t('error.unknown')
  }
  return undefined
})
</script>

<template>
  <v-alert type="error" :text="errorTitle"> </v-alert>
</template>

<style lang="scss" scoped></style>
