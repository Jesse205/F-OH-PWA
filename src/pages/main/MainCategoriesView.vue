<script setup lang="ts">
import UnsafeBypassAlert from '@/components/alert/UnsafeBypassAlert.vue'
import CenterSpace from '@/components/CenterSpace.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import AppListProjectItem from '@/components/list/AppListProjectItem.vue'
import { useAppsStore } from '@/store/apps'
import { getAppShareUrl, type AppInfo } from '@/utils/apps'
import { watchImmediate } from '@vueuse/core'
import { computed, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Apps
const appsStore = useAppsStore()

const isLoading = computed(() => appsStore.isLoading)

const errMsg = computed(() => (appsStore.error ? String(appsStore.error) : undefined))

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
watchImmediate(
  computed((): AppInfo[] | undefined => appsStore.data),
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
)

/**
 * 刷新应用列表
 */
function refresh() {
  appsStore.refreshData()
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

onMounted(() => {
  appsStore.ensureData()
})
</script>

<template>
  <app-main>
    <!-- Alerts -->
    <v-alert v-if="errMsg" class="my-4 mx-4" :title="$t('error.loading')" :text="errMsg" type="error" />
    <UnsafeBypassAlert v-if="errMsg && appsStore.data === undefined" class="ma-4" />

    <!-- MainLayout -->
    <app-category-list class="my-4 mx-4">
      <template v-for="appType in appTypes">
        <app-list-category v-if="appType.apps && appType.apps.length" :key="appType.key" :subheader="appType.title">
          <div class="project-items" @dragstart="onProjectDragStart">
            <app-list-project-item
              v-for="item in appType.apps"
              :key="item.id"
              class="project-item"
              :item="item"
              :data-pkg="item.packageName"
              data-allow-drag
            />
          </div>
        </app-list-category>
      </template>
    </app-category-list>

    <template #root>
      <!-- Loading -->
      <CenterSpace v-if="isLoading || apps.length === 0">
        <v-progress-circular v-if="isLoading" indeterminate style="pointer-events: none" />
        <span v-else-if="apps.length === 0">{{ $t('empty.apps') }}</span>
      </CenterSpace>
    </template>
  </app-main>
</template>

<style scoped lang="scss">
.project-items {
  --columns: 1;
  --indent-padding-left: 64px;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
}

.project-item {
  width: 100%;
}

@mixin column($count: number) {
  .project-items {
    --columns: #{$count};
  }
  .project-item:nth-last-child(#{$count})::before {
    border-bottom-width: 0;
  }
}

@media (min-width: 800px) {
  @include column(2);
}
@media (min-width: 1280px) {
  @include column(3);
}
@media (min-width: 1920px) {
  @include column(4);
}
</style>
