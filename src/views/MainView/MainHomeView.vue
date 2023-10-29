<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue'
import HomeBanner from './components/HomeBanner.vue'
import { Banners } from '@/ts/interfaces/home.interfaces'
import { useI18n } from 'vue-i18n'
import { URL_API_HOME, URL_API } from '@/data/constants'
import IMAGE_BANNER1 from '@/assets/images/main_banner_1.png'
import IMAGE_BANNER2 from '@/assets/images/main_banner_2.png'
import IMAGE_BANNER3 from '@/assets/images/main_banner_3.png'
import { HomeData } from '@/ts/interfaces/home.interfaces'
import { autoFetchJson } from '@/util/fetch'

const { t } = useI18n()

const loaded = ref(false)
const errMsg: Ref<string | null> = ref(null)
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

const homeData = ref<HomeData | null>(null)

onMounted(() => {
  loaded.value = false

  autoFetchJson(URL_API_HOME)
    .then((data) => {
      homeData.value = data as HomeData
      console.log('fetched home data', data)
    })
    .catch((reason) => {
      console.error("Can't load data:", reason)
      errMsg.value = reason.toString()
    })
    .finally(() => {
      loaded.value = true
    })
})
</script>

<template>
  <v-container class="py-0">
    <!-- Alerts -->
    <v-alert class="my-4" v-if="errMsg" title="Load error" :text="errMsg" type="error" variant="tonal" />
  </v-container>
  <!-- MainLayout -->
  <!-- 轮播图 -->
  <HomeBanner class="my-4" :banners="banners" :base-url="URL_API" />
  <v-container class="py-0">
    <v-list class="my-4" v-if="homeData?.showAnnouncement" border rounded="lg">
      <!-- 公告 -->
      <v-list-subheader>{{ $t('announcement.name') }}</v-list-subheader>
      <v-list-item class="announcementContent" v-text="homeData.announcement"></v-list-item>
    </v-list>
  </v-container>
  <!-- Loading -->
  <div v-if="!loaded" class="centerSpace">
    <v-progress-circular indeterminate :size="40" :width="4" />
  </div>
</template>

<style scoped>
.announcementContent {
  white-space: pre-line;
  display: block;
}
</style>
