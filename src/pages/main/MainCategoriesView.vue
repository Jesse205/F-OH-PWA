<script setup lang="ts">
import CenterSpace from '@/components/CenterSpace.vue'
import ProjectItem from '@/components/list/AppListItemProject.vue'
import AppList from '@/components/list/AppList.vue'
import { useAppsStore } from '@/store/apps'
import { getAppShareUrl, type AppInfo } from '@/utils/apps'
import { computed, onMounted, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Apps
const appsStore = useAppsStore()

onMounted(() => {
  appsStore.ensureData()
})
appsStore.autoRefresh()

const loading = computed(() => appsStore.loading)

const errMsg = computed(() => appsStore.errMsg)

interface AppTypes {
  title: string
  apps: AppInfo[]
  key: string
}

const apps = reactive<AppInfo[]>([])
const gameApps = reactive<AppInfo[]>([])
// 未知的应用类型
const otherApps = reactive<AppInfo[]>([])

const appTypes = computed<AppTypes[]>((): AppTypes[] => [
  {
    title: t('app.title'),
    apps: apps,
    key: 'apps',
  },
  {
    title: t('game'),
    apps: gameApps,
    key: 'games',
  },
  {
    title: t('other'),
    apps: otherApps,
    key: 'others',
  },
])

// 将数据插入不同的分类列表中
watch(
  computed((): AppInfo[] | null => appsStore.data),
  (newData) => {
    apps.length = 0
    gameApps.length = 0
    otherApps.length = 0
    if (newData) {
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

/**
 * 刷新应用列表
 */
function refresh() {
  appsStore.fetchData()
}

defineExpose({ refresh })

function onProjectDragStart(event: DragEvent) {
  console.log(event)
  const { target, dataTransfer } = event
  if (
    target &&
    'dataset' in target &&
    typeof target.dataset === 'object' &&
    target.dataset !== null &&
    'pkg' in target.dataset &&
    typeof target.dataset.pkg === 'string' &&
    dataTransfer
  ) {
    const { pkg } = target.dataset
    const appInfo = appsStore.data?.find((item) => item.packageName === pkg)
    if (appInfo) {
      const infoUrl = getAppShareUrl(appInfo.packageName).href
      dataTransfer.clearData()
      dataTransfer.setData('text/uri-list', infoUrl)
      dataTransfer.setData('text/plain', infoUrl)
      dataTransfer.effectAllowed = 'copyLink'
    }
  }
}
</script>

<template>
  <app-main>
    <v-container class="container py-0" fluid>
      <!-- Alerts -->
      <v-alert v-if="errMsg" class="my-4" :title="$t('error.loading')" :text="errMsg" type="error" />
      <!-- MainLayout -->
      <template v-for="appType in appTypes">
        <app-list v-if="appType.apps && appType.apps.length" :key="appType.key" class="my-4" :title="appType.title">
          <div class="project-items" @dragstart="onProjectDragStart">
            <ProjectItem
              v-for="item in appType.apps"
              :key="item.id"
              class="project-item"
              :item="item"
              :data-pkg="item.packageName"
              data-allow-drag
            />
          </div>
        </app-list>
      </template>
    </v-container>

    <template #root>
      <!-- Loading -->
      <CenterSpace v-if="loading || apps.length === 0">
        <v-progress-circular v-if="loading" indeterminate style="pointer-events: none" />
        <span v-else-if="apps.length === 0">{{ $t('empty.apps') }}</span>
      </CenterSpace>
    </template>
  </app-main>
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
