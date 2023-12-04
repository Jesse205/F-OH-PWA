<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import HomeBanner from './components/HomeBanner.vue'
import type { Banners } from '@/ts/interfaces/home.interfaces'
import { URL_API } from '@/data/constants'
import IMAGE_BANNER1 from '@/assets/images/main_banner_1.png'
import IMAGE_BANNER2 from '@/assets/images/main_banner_2.png'
import IMAGE_BANNER3 from '@/assets/images/main_banner_3.png'
import { useHomeStore } from '@/store/home'
import TitleList from '@/components/list/TitleList.vue'
import CenterSpace from '@/components/CenterSpace.vue'
import { useElementBounding } from '@vueuse/core'
import { max } from 'lodash'

const homeStore = useHomeStore()
onMounted(() => {
  homeStore.ensureData()
})

const loading = computed(() => homeStore.loading)
const errMsg = computed(() => homeStore.errMsg)

const banners: Banners = {
  data: [
    {
      image: IMAGE_BANNER1,
    },
    {
      image: IMAGE_BANNER2,
    },
    {
      image: IMAGE_BANNER3,
    },
  ],
  ratio: 18 / 9,
}

const bannersComponent = ref(null)
const { top: bannersTop, height: bannersHeight } = useElementBounding(bannersComponent)
console.log(bannersTop, bannersHeight)

function refresh() {
  homeStore.fetchData()
}

defineExpose({ refresh })
</script>

<template>
  <app-main>
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
    <template v-slot:root>
      <!-- Loading -->
      <CenterSpace v-if="loading" :top="max([bannersTop + bannersHeight + 16, 0])">
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
}
</style>
