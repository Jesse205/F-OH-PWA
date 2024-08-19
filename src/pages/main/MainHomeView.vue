<script setup lang="ts">
import UnsafeBypassAlert from '@/components/alert/UnsafeBypassAlert.vue'
import AppMain from '@/components/AppMain.vue'
import CenterSpace from '@/components/CenterSpace.vue'
import TitleList from '@/components/list/AppList.vue'
import { carousel } from '@/data/home'
import { useHomeStore } from '@/store/home'
import { isChrome } from '@/utils/browser'
import { useElementBounding, useScroll } from '@vueuse/core'
import { max } from 'lodash-es'
import { computed, onMounted, ref } from 'vue'
import HomeCarousel from './components/HomeCarousel.vue'
const homeStore = useHomeStore()
onMounted(() => {
  homeStore.ensureData()
})

const isLoading = computed(() => homeStore.isLoading)
const errMsg = computed(() => (homeStore.error ? String(homeStore.error) : undefined))

const mainComponent = ref<InstanceType<typeof AppMain>>()
const { y: scrollY } = useScroll(computed(() => mainComponent.value?.mainScroll))

const carouselComponent = ref<InstanceType<typeof HomeCarousel>>()
const { height: carouselHeight } = useElementBounding(carouselComponent, { windowScroll: false })

/**
 * 刷新主页数据
 */
function refresh() {
  homeStore.refreshData()
}

defineExpose({ refresh })

/**
 * 轮播图高度 + 16
 */
const progressMarginTop = computed(() => {
  return max([-scrollY.value + carouselHeight.value + 16, 0])
})
</script>

<template>
  <app-main ref="mainComponent">
    <!-- 轮播图 -->
    <HomeCarousel ref="carouselComponent" class="ma-4" :items="carousel.items" :ratio="carousel.ratio" />

    <!-- Alerts -->
    <v-alert v-if="errMsg" class="ma-4" :title="$t('error.loading')" :text="errMsg" type="error" />
    <UnsafeBypassAlert v-if="errMsg && homeStore.data === undefined && isChrome" class="ma-4" />

    <!-- 公告 -->
    <title-list v-if="homeStore.isShowAnnouncement" class="ma-4" :title="$t('announcement')">
      <!-- eslint-disable-next-line vue/no-v-html vue/no-v-text-v-html-on-component -->
      <v-list-item class="announcement-content typo-style" v-html="homeStore.announcementHtml" />
    </title-list>
    <template #root>
      <!-- Loading -->
      <CenterSpace v-if="isLoading" :top="progressMarginTop">
        <v-progress-circular indeterminate />
      </CenterSpace>
    </template>
  </app-main>
</template>

<style scoped lang="scss">
.announcement-content {
  display: block;
  user-select: text;
}
</style>
