<script setup lang="ts">
import { AppInfo } from '@/ts/interfaces/app.interfaces'
import { URL_API } from '@/data/constants'
import { getCompletePath } from "@/util/url"
import { computed } from 'vue';

const props = defineProps<{
  item: AppInfo
}>()

const iconCompletePath = computed(() => {
  return getCompletePath(props.item.icon, URL_API)
})

</script>

<template>
  <v-list-item lines="two" :title="item.name" :subtitle="item.desc" :to="`/app/${item.id}`">
    <template v-slot:prepend>
      <v-avatar class="elevation-1" rounded="lg" size="48">
        <v-img :src="iconCompletePath" />
      </v-avatar>
    </template>
    <slot />
  </v-list-item>
</template>
