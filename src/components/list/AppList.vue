<script setup lang="ts">
import { toRefs } from 'vue'
import { useDefaults } from 'vuetify'
import { provideDefaults } from 'vuetify/lib/composables/defaults'

interface Props {
  carded?: boolean
  divider?: boolean
  dividerInset?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  divider: undefined,
  dividerInset: undefined,
})

const { carded, divider, dividerInset } = toRefs(useDefaults(props))
provideDefaults({
  AppListCategory: {
    divider,
    dividerInset,
  },
  AppListItem: {
    divider,
    dividerInset,
  },
})
</script>

<template>
  <v-list class="app-list" :class="{ 'app-list--carded ': carded }">
    <template v-if="$slots.default"><slot /></template>
  </v-list>
</template>

<style lang="scss">
.app-list--carded {
  padding: 0;
  background-color: transparent;
}
</style>
