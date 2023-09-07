<script setup lang="ts">
import { useHomeTitle } from '@/events/title'
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectItem from '@/components/ProjectItem.vue'
import { useAppsStore } from '@/store/apps'

const { t } = useI18n()

//Title
useHomeTitle(t('category.name', 2))

//Apps
const appsStore = useAppsStore()
onMounted(() => {
  appsStore.ensureData()
})

const loaded = computed(() => {
  return !appsStore.loading
})

const errMsg = computed(() => {
  return appsStore.errMsg
})

</script>

<template>
  <v-container class="py-0">
    <!-- Alerts -->
    <v-alert class="my-4" v-if="errMsg" title="Load error" :text="errMsg" type="error" variant="tonal" />
    <!-- MainLayout -->
    <v-list v-if="appsStore.data" class="my-4" border rounded="lg">
      <!-- <v-list-subheader>{{ group.name }}</v-list-subheader> -->
      <ProjectItem v-for="item in appsStore.data" :key="item.id" :item="item" :to="`/app/${item.id}`" />
    </v-list>
  </v-container>
  <!-- Loading -->
  <div v-if="!loaded" class="centerSpace">
    <v-progress-circular indeterminate :size="40" :width="4" />
  </div>
</template>

<style scoped lang="scss"></style>
