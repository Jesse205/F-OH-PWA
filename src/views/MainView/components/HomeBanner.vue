<script setup lang="ts">
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import type { Banners } from '@/ts/interfaces/home.interfaces'
import { useDisplay } from 'vuetify'

import { cloneDeep } from 'lodash-es'
import { getCompletePath } from '@/util/url'

const props = defineProps<{
  banners: Banners
  baseUrl?: string
}>()

const { xs, mdAndDown } = useDisplay()

const slidesPerView = computed(() => {
  if (xs.value) {
    return 1
  } else if (mdAndDown.value) {
    return 2
  } else {
    return 3
  }
})

const newBanners = computed(() => {
  const newBannersData = cloneDeep(props.banners)
  newBannersData.data.forEach((item) => {
    if (item.src) {
      item.src = getCompletePath(item.src, props.baseUrl || location.href)
    }
  })
  return newBannersData
})
</script>

<template>
  <v-container class="container" @dragstart.stop>
    <swiper
      class="swiper"
      :slides-per-view="slidesPerView"
      :space-between="16"
      :pagination="{
        clickable: true,
      }"
      :modules="[Pagination]"
    >
      <swiper-slide v-for="item in newBanners?.data" :key="item.image" role="banner">
        <component :is="item.src ? 'a' : 'div'" :href="item.src" target="_blank">
          <v-img class="image bg-surface" :aspect-ratio="banners?.ratio" :src="item.image" cover />
        </component>
      </swiper-slide>
    </swiper>
  </v-container>
</template>

<style scoped lang="scss">
.container {
  padding: 0;

  > .swiper {
    // 防止计算误差导致边缘露出图片
    padding: 0 15.5px;
    position: relative;
  }
}
.image {
  border-radius: 16px;
}
</style>
