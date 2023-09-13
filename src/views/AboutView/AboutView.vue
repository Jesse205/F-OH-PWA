<script setup lang="ts">
import { useDisplay } from 'vuetify'
import AppCard from './components/AppCard.vue'
import AppMain from '@/components/AppMain.vue'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@/events/title'
import { getTauriVersion, getVersion } from '@tauri-apps/api/app'
import { ComputedRef, computed, ref } from 'vue'
import { isTauri } from '@/util/app'

const { t } = useI18n()
useTitle(computed(() => t('about.name')))

const appVersion = ref(__VERSION__)

interface DeveloperItem {
  avatar?: string
  title: string
  summary: string
  qq?: number
}

const developers = computed<DeveloperItem[]>(() => [
  {
    qq: 517858177,
    title: t('developer.westinyang.name'),
    summary: t('developer.westinyang.description')
  },
  {
    qq: 2140125724,
    title: t('developer.eddie.name'),
    summary: t('developer.eddie.description')
  }
])

const { mobile, mdAndUp } = useDisplay()

const URL_SOURCE = 'https://gitee.com/ohos-dev/F-OH-PWA'

const tauriVersion = ref()

if (isTauri()) {
  getTauriVersion().then(version => {
    tauriVersion.value = version
  })
  getVersion().then(version => {
    appVersion.value = version
  })
}
</script>

<template>
  <v-app-bar flat border="b">
    <v-btn v-if="$router.options.history.state.back" icon="mdi-arrow-left" @click.stop="$router.back" />
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
        <v-list-item prepend-icon="mdi-information-outline" :title="$t('app.version')" :subtitle="appVersion" />
        <!-- Tauri 版本 -->
        <v-list-item
          v-if="tauriVersion"
          prepend-icon="mdi-information-outline"
          :title="$t('tauri.version')"
          :subtitle="tauriVersion"
        />
        <v-divider></v-divider>
        <!-- 开发者信息 -->
        <v-list-subheader>{{ $t('develop.messages') }}</v-list-subheader>
        <v-list-item
          v-for="item in developers"
          :key="item.title"
          :prepend-avatar="item.avatar || `https://q1.qlogo.cn/g?b=qq&nk=${item.qq}&s=100`"
          :title="item.title"
          :subtitle="item.summary"
        >
        </v-list-item>
        <v-divider></v-divider>
        <!-- 交流讨论 -->
        <v-list-subheader>{{ $t('communicate.name') }}</v-list-subheader>
        <!-- QQ 群 -->
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          :title="$t('communicate.qqGroup')"
          subtitle="752399947"
          href="https://qm.qq.com/q/jWeBdnvPz2"
          target="_blank"
          append-icon="mdi-open-in-new"
        />
        <v-divider></v-divider>
        <!-- 相关链接 -->
        <v-list-subheader>{{ $t('link.related') }}</v-list-subheader>
        <!-- 源代码 -->
        <v-list-item
          prepend-icon="mdi-code-tags"
          :title="$t('source.code')"
          :subtitle="URL_SOURCE"
          :href="URL_SOURCE"
          target="_blank"
          append-icon="mdi-open-in-new"
        />
        <v-list-item
          prepend-icon="mdi-application-outline"
          :title="$t('link.foh.title')"
          :subtitle="$t('link.foh.description')"
          href="https://gitee.com/ohos-dev/f-oh"
          target="_blank"
          append-icon="mdi-open-in-new"
        />
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          :title="$t('link.organization.title')"
          :subtitle="$t('link.organization.description')"
          href="https://gitee.com/ohos-dev"
          target="_blank"
          append-icon="mdi-open-in-new"
        />
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
