<script setup lang="ts">
import ErrorAlert from '@/components/alert/ErrorAlert.vue'
import UnsafeBypassAlert from '@/components/alert/UnsafeBypassAlert.vue'
import CenterSpace from '@/components/CenterSpace.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import AppListProjectItem from '@/components/list/AppListProjectItem.vue'
import type { AppInfo } from '@/data/apps'
import { useAppsStore } from '@/store/apps'
import { getAppShareUrl } from '@/utils/apps'
import { isChrome } from '@/utils/browser'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Apps
const appsStore = useAppsStore()

const isLoading = computed(() => appsStore.isLoading)

interface AppTypes {
  title: string
  apps: Pick<AppInfo, 'name' | 'packageName' | 'icon' | 'version' | 'desc' | 'id'>[]
  key: string
}

const appTypes = computed<AppTypes[]>((): AppTypes[] => [
  {
    title: t('app.title'),
    apps: appsStore.normalApps,
    key: 'apps',
  },
  {
    title: t('game'),
    apps: appsStore.gameApps,
    key: 'games',
  },
  {
    title: t('other'),
    apps: appsStore.othersApps,
    key: 'others',
  },
])

/**
 * 刷新应用列表
 */
function refresh(): void {
  appsStore.loadData(true)
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
    const appInfo = appsStore.apps?.find((item) => item.packageName === pkg)
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
  <v-main>
    <!-- Alerts -->
    <ErrorAlert v-if="appsStore.hasError" class="ma-4" :error="appsStore.errorArray" />
    <UnsafeBypassAlert v-if="appsStore.hasError && isChrome" class="ma-4" />

    <!-- MainLayout -->
    <app-category-list v-if="appsStore.hasApps" class="ma-4">
      <template v-for="appType in appTypes">
        <app-list-category v-if="appType.apps && appType.apps.length > 0" :key="appType.key" :subheader="appType.title">
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

    <CenterSpace v-if="isLoading || !appsStore.hasApps">
      <v-progress-circular v-if="isLoading" indeterminate style="pointer-events: none" />
      <span v-else-if="!appsStore.hasApps">{{ $t('empty.apps') }}</span>
    </CenterSpace>
  </v-main>
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
