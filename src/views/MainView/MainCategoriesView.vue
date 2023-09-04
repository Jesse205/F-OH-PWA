<script setup lang="ts">
import { URL_ALL_APP_LIST } from '@/data/constants';
import { useHomeTitle } from '@/events/title'
import { Ref, onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { AppInfo } from '@/ts/interfaces/app.interfaces';
import ProjectItem from '@/components/ProjectItem.vue';
import { useAppStore } from '../../store/app';

const { t } = useI18n()

//Title
useHomeTitle(t('category.name', 2))

//Apps
const appStore = useAppStore()
onMounted(() => {
  appStore.ensureData()
})

const loaded = computed(() => {
  return !appStore.loading
})

const errMsg = computed(() => {
  return appStore.errMsg
})

</script>

<template>
  <v-container class="py-0">
    <!-- Alerts -->
    <v-alert class="my-4" v-if="errMsg" title="Load error" :text="errMsg" type="error" variant="tonal" />
    <!-- MainLayout -->
    <v-list class="my-4" border rounded="lg">
      <!-- <v-list-subheader>{{ group.name }}</v-list-subheader> -->
      <ProjectItem v-for="item in appStore.data" :key="item.id" :item="item" :to="`/app/${item.id}`" />
    </v-list>
  </v-container>
  <!-- Loading -->
  <div v-if="!loaded" class="centerSpace">
    <v-progress-circular indeterminate :size="40" :width="4" />
  </div>
</template>

<style scoped lang="scss"></style>
