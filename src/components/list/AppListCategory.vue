<script lang="ts" setup>
import { toRefs } from 'vue'
import { useDefaults } from 'vuetify'
import { provideDefaults } from 'vuetify/lib/composables/defaults'

interface Props {
  subheader?: string
  subheaderSticky?: boolean
  divider?: boolean
  dividerInset?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  divider: undefined,
  dividerInset: undefined,
})
const { divider, dividerInset } = toRefs(useDefaults(props))

provideDefaults({
  AppListItem: {
    divider,
    dividerInset,
  },
})
</script>

<template>
  <div class="app-list-category">
    <v-list-subheader v-if="subheader || $slots.subheader" :sticky="subheaderSticky">
      <slot name="subheader">{{ subheader }}</slot>
    </v-list-subheader>
    <div v-if="$slots.default" class="app-list-category__items">
      <slot />
    </div>
  </div>
</template>

<style lang="scss"></style>
