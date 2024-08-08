<script setup lang="ts">
import type { Banner } from '@/data/home'
import { completeUrl } from '@/utils/url'
import { Pagination } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps<{
  banners: Banner[]
  ratio: number
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
const banners = computed((): Banner[] => {
  const result = []
  for (const item of props.banners) {
    result.push({ ...item, src: item.src ? completeUrl(item.src, props.baseUrl || location.href) : undefined })
  }
  return result
})
</script>

<template>
  <swiper
    class="swiper"
    :slides-per-view="slidesPerView"
    :space-between="16"
    :pagination="{
      clickable: true,
    }"
    :modules="[Pagination]"
    @dragstart.stop
  >
    <swiper-slide v-for="item in banners" :key="item.image" role="banner">
      <component :is="item.src ? 'a' : 'div'" :href="item.src" :target="item.src ? '_blank' : undefined">
        <v-img class="image bg-surface" :aspect-ratio="ratio" :src="item.image" cover :alt="item.alt" />
      </component>
    </swiper-slide>
  </swiper>
</template>

<style scoped lang="scss">
.swiper {
  // 防止计算误差导致边缘露出图片
  padding: 0 15.5px;
  position: relative;
}

.image {
  border-radius: var(--radius-card);
}
</style>
