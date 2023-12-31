<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import CenterSpace from '@/components/CenterSpace.vue'
import TitleList from '@/components/list/TitleList.vue'
import { URL_API } from '@/constants/urls'
import { useHomeStore } from '@/store/home'
import { useElementBounding, useScroll } from '@vueuse/core'
import { max } from 'lodash-es'
import { computed, onMounted, ref } from 'vue'
import { banners } from '@/data/banners'

import HomeBanner from './components/HomeBanner.vue'

const homeStore = useHomeStore()
onMounted(() => {
  homeStore.ensureData()
})
homeStore.autoRefresh()

const loading = computed(() => homeStore.loading)
const errMsg = computed(() => homeStore.errMsg)

const mainComponent = ref<InstanceType<typeof AppMain>>()
const { y: scrollY } = useScroll(computed(() => mainComponent.value?.mainScroll))

const bannersComponent = ref<InstanceType<typeof HomeBanner>>()
const { height: bannersHeight } = useElementBounding(bannersComponent, { windowScroll: false })

/**
 * 刷新主页数据
 */
function refresh() {
  homeStore.fetchData()
}

defineExpose({ refresh })

/**
 * 轮播图高度 + 16
 */
const progressMarginTop = computed(() => {
  return max([-scrollY.value + bannersHeight.value + 16, 0])
})
</script>

<template>
  <app-main ref="mainComponent">
    <!-- MainLayout -->
    <!-- 轮播图 -->
    <HomeBanner ref="bannersComponent" class="my-4" :banners="banners" :base-url="URL_API" />
    <v-container class="py-0">
      <!-- Alerts -->
      <v-alert v-if="errMsg" class="my-4" :title="$t('error.loading')" :text="errMsg" type="error" />
      <!-- 公告 -->
      <title-list v-if="homeStore.data?.showAnnouncement" class="my-4" :title="$t('announcement.name')">
        <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
        <v-list-item class="announcementContent" v-html="homeStore.announcementHtml" />
      </title-list>
    </v-container>
    <template #root>
      <!-- Loading -->
      <CenterSpace v-if="loading" :top="progressMarginTop">
        <v-progress-circular indeterminate />
      </CenterSpace>
    </template>
  </app-main>
</template>

<style scoped lang="scss">
.announcementContent {
  /* white-space: pre-line; */
  display: block;

  & > :not(:first-child) {
    margin-top: 0.5rem;
  }
  & > :not(:last-child) {
    margin-bottom: 0.5rem;
  }

  & :deep(ul),
  & :deep(ol) {
    padding-left: 1rem;
  }

  & :deep(code) {
    background-color: rgb(var(--v-theme-code));
    color: rgb(var(--v-theme-on-code));
    border-radius: 4px;
    line-height: 2;
    font-size: 0.8em;
    font-weight: normal;
    padding: 0.2em 0.4em;
  }
  & :deep(a) {
    color: rgb(var(--v-theme-primary));

    &:hover {
      color: rgba(var(--v-theme-primary), 0.7);
    }
    &:active {
      color: rgba(var(--v-theme-primary), 0.9);
    }
  }
}
</style>
@/constants/constants
