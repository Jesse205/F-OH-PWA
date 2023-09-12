<script setup lang="ts">
import { useHomeTitle } from '@/events/title'
import { onMounted, computed, ref, watch, reactive, MaybeRef } from 'vue';
import { useI18n } from 'vue-i18n'
import ProjectItem from '@/components/ProjectItem.vue'
import { useAppsStore } from '@/store/apps'
import { AppInfo } from '@/ts/interfaces/app.interfaces'

const { t } = useI18n()

//Apps
const appsStore = useAppsStore()
onMounted(() => {
  appsStore.ensureData()
})

const loaded = computed(() => {
  return !appsStore.loading && appsStore.data
})

const errMsg = computed(() => {
  return appsStore.errMsg
})

interface AppTypes {
  title: MaybeRef<string>
  apps: AppInfo[]
}


const apps = reactive<AppInfo[]>([])
const gameApps = reactive<AppInfo[]>([])
// 未知的应用类型
const otherApps = reactive<AppInfo[]>([])

const appTypes = computed<AppTypes[]>(() => {
  return <AppTypes[]>[
    {
      title: t('app.name'),
      apps: apps
    },
    {
      title: t('game.name'),
      apps: gameApps
    },
    {
      title: t('other.name'),
      apps: otherApps
    }
  ]
})

// 将数据插入不同的分类列表中
watch(computed(() => appsStore.data), (newData) => {
  if (newData) {
    apps.length = 0
    for (const item of newData) {
      switch (item.type) {
        case 'app': {
          apps.push(item)
          break
        }
        case 'game': {
          gameApps.push(item)
          break
        }
        default: {
          otherApps.push(item)
          break
        }
      }
    }
  }
}, { immediate: true })

</script>

<template>
  <v-container class="py-0">
    <!-- Alerts -->
    <v-alert class="my-4" v-if="errMsg" title="Load error" :text="errMsg" type="error" variant="tonal" />
    <!-- MainLayout -->
    <template v-if="loaded">
      <template v-for="appType in appTypes">
        <v-list v-if="appType.apps && appType.apps.length" class="my-4" border rounded="lg">
          <v-list-subheader>{{ appType.title }}</v-list-subheader>
          <ProjectItem v-for="item in appType.apps" :key="item.id" :item="item" :to="`/app/${item.id}`" />
        </v-list>
      </template>
    </template>
  </v-container>
  <!-- Loading -->
  <div v-if="!loaded" class="centerSpace">
    <v-progress-circular indeterminate :size="40" :width="4" />
  </div>
</template>

<style scoped lang="scss"></style>
