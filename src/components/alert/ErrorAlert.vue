<script lang="ts" setup>
import { AxiosError } from 'axios'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps<{
  errors?: (Error | unknown)[]
}>()

const isDetailsDialogVisible = ref(false)

const errorTitle = computed<string | undefined>(() => {
  if (props.errors?.every((item) => item instanceof AxiosError)) {
    return t('error.network')
  }
  return t('error.unknown')
})

function getItemTitle(item: unknown) {
  if (item instanceof AxiosError) {
    return item.config?.baseURL ?? t('unknown.title')
  } else if (item instanceof Error) {
    return item.name
  }
  return t('unknown.title')
}
function getItemSubtitle(item: unknown) {
  if (item instanceof Error) {
    return item.message
  }
  return t('unknown.title')
}
</script>

<template>
  <v-alert v-bind="$attrs" type="error" :text="errorTitle">
    <template #append>
      <v-btn :text="$t('action.viewDetails')" @click="isDetailsDialogVisible = true" />
    </template>
  </v-alert>
  <v-dialog v-model="isDetailsDialogVisible">
    <v-card :title="$t('errorDetails.title')">
      <dialog-content-list :lines="false" class="content">
        <v-list-item
          v-for="(item, index) in errors"
          :key="index"
          :title="getItemTitle(item)"
          :subtitle="getItemSubtitle(item)"
        />
      </dialog-content-list>
      <v-card-text class="dialog-tip text-medium-emphasis py-0">
        <v-icon icon="$info" />
        <span>{{ $t('errorDetails.tip') }}</span>
      </v-card-text>
      <template #actions>
        <v-btn :text="$t('action.close')" @click="isDetailsDialogVisible = false" />
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.content {
  user-select: text;
}
.dialog-tip {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  font-size: 14px;
  overflow-y: visible;
}
</style>
