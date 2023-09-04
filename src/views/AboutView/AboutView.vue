<script setup lang="ts">
import { useDisplay } from 'vuetify'
import AppCard from './components/AppCard.vue'
import AppMain from '@/components/AppMain.vue'
import { useI18n } from 'vue-i18n';
import { useTitle } from '@/events/title';

const { t } = useI18n()
useTitle(t('about.name'))

const version = __VERSION__
interface DeveloperItem {
  avatar?: string
  title: string
  summary: string
  qq?: number
}

const developers: DeveloperItem[] = [
  {
    qq: 517858177,
    title: "@westinyang",
    summary: "F-OH 创始人",
  },
  {
    qq: 2140125724,
    title: "@Eddie",
    summary: "PWA 应用开发者",
  }
]

const { mobile, mdAndUp } = useDisplay()

const URL_SOURCE = 'https://gitee.com/Jesse205/F-OH-PWA'
const URL_QQ_GROUP = 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=BoKACHnmIJSGs22g-1Rcr04bwYXIzPeh&authKey=MW41hwVsRvPyJSf4vXQZuNBBAiPVednlMsjB7VOqDPYzhrzqiiuZbPcVFetCVBkJ&noverify=0&group_code=752399947'

</script>

<template>
  <v-app-bar flat border="b">
    <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
    <v-app-bar-title>{{ $t('about.name') }}</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer v-if="!mobile" permanent :width="(mdAndUp ? 200 : 156) + 32">
    <AppCard />
  </v-navigation-drawer>
  <app-main>
    <v-container class="container">
      <AppCard v-if="mobile" />
      <v-list lines="two" active-class="noActivatedOverlay">
        <!-- 关于应用 -->
        <v-list-subheader>{{ $t('app.about') }}</v-list-subheader>
        <!-- 应用版本 -->
        <v-list-item prepend-icon="mdi-information-outline" :title="$t('app.version')" :subtitle="version" />
        <v-divider></v-divider>
        <!-- 开发者信息 -->
        <v-list-subheader>{{ $t('develop.message') }}</v-list-subheader>
        <v-list-item v-for="item in developers" :key="item.title"
          :prepend-avatar="item.avatar || `https://q1.qlogo.cn/g?b=qq&nk=${item.qq}&s=100`" :title="item.title"
          :subtitle="item.summary">
        </v-list-item>
        <v-divider></v-divider>
        <!-- 交流讨论 -->
        <v-list-subheader>{{ $t('communicate.name') }}</v-list-subheader>
        <!-- QQ 群 -->
        <v-list-item prepend-icon="mdi-account-group-outline" :title="$t('communicate.qqGroup')" subtitle="752399947"
          :href="URL_QQ_GROUP" target="_blank" />
        <v-divider></v-divider>
        <!-- 相关链接 -->
        <v-list-subheader>{{ $t('link.related') }}</v-list-subheader>
        <!-- 源代码 -->
        <v-list-item prepend-icon="mdi-code-tags" :title="$t('source.code')" :subtitle="URL_SOURCE" :href="URL_SOURCE"
          target="_blank" />
      </v-list>
    </v-container>
    <!-- </div> -->
  </app-main>
</template>

<style scoped>
.container {
  padding: 0;
}
</style>