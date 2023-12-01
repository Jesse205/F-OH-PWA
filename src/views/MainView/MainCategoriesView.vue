<script setup lang="ts">
import type { MaybeRef } from 'vue'
import { onMounted, computed, watch, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectItem from '@/components/list/ProjectItem.vue'
import { useAppsStore } from '@/store/apps'
import type { AppInfo } from '@/ts/interfaces/app.interfaces'
import { unref } from 'vue'

const { t } = useI18n()

// Apps
const appsStore = useAppsStore()

onMounted(() => {
  appsStore.ensureData()
})

const loading = computed(() => appsStore.loading)
const loaded = computed(() => !loading.value && Boolean(appsStore.data))

const errMsg = computed(() => appsStore.errMsg)

interface AppTypes {
  title: MaybeRef<string>
  apps: AppInfo[]
}

const apps = reactive<AppInfo[]>([])
const gameApps = reactive<AppInfo[]>([])
// 未知的应用类型
const otherApps = reactive<AppInfo[]>([])

const appTypes = computed<AppTypes[]>((): AppTypes[] => [
  {
    title: t('app.name'),
    apps: apps,
  },
  {
    title: t('game.name'),
    apps: gameApps,
  },
  {
    title: t('other.name'),
    apps: otherApps,
  },
])

// 将数据插入不同的分类列表中
watch(
  computed(() => appsStore.data),
  (newData) => {
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
  },
  { immediate: true },
)
</script>

<template>
  <v-container class="container py-0" fluid>
    <!-- Alerts -->
    <v-alert v-if="errMsg" class="my-4" title="Load error" :text="errMsg" type="error" variant="tonal" />
    <!-- MainLayout -->
    <template v-if="loaded">
      <template v-for="appType in appTypes">
        <v-list v-if="appType.apps && appType.apps.length" :key="unref(appType.title)" class="my-4">
          <v-list-subheader>{{ appType.title }}</v-list-subheader>
          <div class="project-items">
            <ProjectItem
              v-for="item in appType.apps"
              :key="item.id"
              class="project-item"
              :item="item"
              :to="`/app/${item.id}`"
            />
          </div>
        </v-list>
      </template>
    </template>
  </v-container>
  <!-- Loading -->
  <div v-if="loading" class="centerSpace">
    <v-progress-circular indeterminate />
  </div>
</template>

<style scoped lang="scss">
.project-items {
  display: flex;
  flex-wrap: wrap;
  --indent-padding-left: 64px;

  .project-item {
    width: 100%;
    @media (min-width: 800px) {
      width: 50%;
      &:nth-last-child(2)::before {
        border-bottom-width: 0;
      }
    }
    @media (min-width: 1280px) {
      width: 33%;
      &:nth-last-child(3)::before {
        border-bottom-width: 0;
      }
    }
    @media (min-width: 1920px) {
      width: 25%;
      &:nth-last-child(4)::before {
        border-bottom-width: 0;
      }
    }
  }
}
</style>
