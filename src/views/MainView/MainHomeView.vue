<script setup lang="ts">
import { Ref, onMounted, ref, computed } from 'vue';
import { useHomeTitle } from '@/events/title'
import HomeBanner from './components/HomeBanner.vue'
import { Banners } from '@/ts/interfaces/banner.interfaces'
import { useI18n } from 'vue-i18n'
import { URL_HOME, URL_API } from '@/data/constants'
import IMAGE_BANNER1 from '@/assets/images/main_banner_1.png'
import IMAGE_BANNER2 from '@/assets/images/main_banner_2.png'
import IMAGE_BANNER3 from '@/assets/images/main_banner_3.png'
import { HomeData } from '@/ts/interfaces/home.interfaces';

const { t } = useI18n()

//Title
useHomeTitle(t('home.name'))

const loaded = ref(false)
const errorText: Ref<string | null> = ref(null)
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
  fetch(URL_HOME)
    .then(response => response.json())
    .then(data => {
      console.log('fetched home data', data)
      homeData.value = data
    })
    .catch((reason) => {
      console.error('Can\'t load data:', reason)
      errorText.value = reason.toString()
    })
    .finally(() => {
      loaded.value = true
    })
})

</script>

<template>
  <!-- Alerts -->
  <v-container v-if="errorText">
    <v-alert v-if="errorText" title="Loading error" :text="errorText" type="error" variant="tonal" />
  </v-container>
  <!-- MainLayout -->
  <!-- 轮播图 -->
  <HomeBanner :banners="banners" :base-url="URL_API" />
  <v-container v-if="homeData">
    <v-list v-if="homeData.showAnnouncement" border rounded="lg" class="prependIconPrimaryItem">
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
