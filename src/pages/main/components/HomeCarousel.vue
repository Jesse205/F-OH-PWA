<script setup lang="ts">
import 'swiper/scss'
import 'swiper/scss/pagination'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

import type { CarouselItem } from '@/data/home'
import { completeUrl } from '@/utils/url'

const props = defineProps<{
  items: CarouselItem[]
  ratio: number
  baseUrl?: string
}>()

const { xs, mdAndDown, lgAndDown } = useDisplay()

const slidesPerView = computed(() => {
  if (xs.value) {
    return 1
  } else if (mdAndDown.value) {
    return 2
  } else if (lgAndDown.value) {
    return 3
  } else {
    return 4
  }
})

const items = computed((): CarouselItem[] => {
  const result = []
  for (const item of props.items) {
    result.push({ ...item, src: item.src ? completeUrl(item.src, props.baseUrl || location.href) : undefined })
  }
  return result
})
</script>

<template>
  <swiper
    class="swiper"
    :slides-per-view="slidesPerView"
    :space-between="16.5"
    :pagination="{
      clickable: true,
    }"
    :modules="[Pagination]"
    @dragstart.stop
  >
    <swiper-slide v-for="item in items" :key="item.image" role="banner">
      <component :is="item.src ? 'a' : 'div'" :href="item.src" :target="item.src ? '_blank' : undefined">
        <v-card>
          <v-img class="bg-surface" :aspect-ratio="ratio" :src="item.image" cover :alt="item.alt" />
        </v-card>
      </component>
    </swiper-slide>
  </swiper>
</template>

<style scoped lang="scss">
.swiper {
  // 防止计算误差导致边缘露出图片
  overflow: visible;
  position: relative;
}
</style>
