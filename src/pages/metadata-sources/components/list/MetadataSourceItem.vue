<script lang="ts" setup>
const props = defineProps<{
  name: string
  description?: string
  apiUrl: string
  editable: boolean
}>()
const enabled = defineModel<boolean>('enabled', { default: false })
const emits = defineEmits<{
  edit: []
}>()

function onClick() {
  if (props.editable) {
    emits('edit')
  } else {
    enabled.value = !enabled.value
  }
}
</script>

<template>
  <v-list-item class="metadata-source-item" :title="name" @click="onClick">
    <v-list-item-subtitle v-if="description">{{ description }}</v-list-item-subtitle>
    <v-list-item-subtitle>{{ apiUrl }}</v-list-item-subtitle>
    <template #append>
      <template v-if="editable">
        <v-divider class="append-divider" vertical />
        <v-switch v-model="enabled" @click.stop />
      </template>
      <template v-else>
        <v-switch v-model="enabled" tabindex="-1" />
      </template>
    </template>
  </v-list-item>
</template>

<style lang="scss" scoped>
.metadata-source-item {
  &:deep(.v-list-item__append) {
    height: 100%;
  }
}
.append-divider {
  height: 32px;
  align-self: center;
  margin-right: 16px;
}
</style>
