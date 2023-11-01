<script setup lang="ts">
import { computed, onMounted } from 'vue'
import HomeBanner from './components/HomeBanner.vue'
import { Banners } from '@/ts/interfaces/home.interfaces'
import { URL_API } from '@/data/constants'
import IMAGE_BANNER1 from '@/assets/images/main_banner_1.png'
import IMAGE_BANNER2 from '@/assets/images/main_banner_2.png'
import IMAGE_BANNER3 from '@/assets/images/main_banner_3.png'
import { useHomeStore } from '@/store/home'

const homeStore = useHomeStore()
onMounted(() => {
  homeStore.ensureData()
})

const loading = computed(() => homeStore.loading)
// const loaded = computed(() => !loading.value && homeStore.data)
const errMsg = computed(() => homeStore.errMsg)

const banners: Banners = {
  data: [
    {
      image: IMAGE_BANNER1
    },
    {
      image: IMAGE_BANNER2
    },
    {
      image: IMAGE_BANNER3
    }
  ],
  ratio: 18 / 9
}
</script>

<template>
  <v-container class="py-0">
    <!-- Alerts -->
    <v-alert class="my-4" v-if="errMsg" title="Load error" :text="errMsg" type="error" variant="tonal" />
  </v-container>
  <!-- MainLayout -->
  <!-- 轮播图 -->
  <HomeBanner class="my-4" :banners="banners" :base-url="URL_API" />
  <v-container class="py-0" v-if="homeStore.data?.showAnnouncement">
    <v-list class="my-4" border rounded="lg">
      <!-- 公告 -->
      <v-list-subheader>{{ $t('announcement.name') }}</v-list-subheader>
      <v-list-item class="announcementContent" v-text="homeStore.data.announcement"></v-list-item>
    </v-list>
  </v-container>
  <!-- Loading -->
  <div v-if="loading" class="centerSpace">
    <v-progress-circular indeterminate :size="40" :width="4" />
  </div>
</template>

<style scoped>
.announcementContent {
  white-space: pre-line;
  display: block;
}
</style>
