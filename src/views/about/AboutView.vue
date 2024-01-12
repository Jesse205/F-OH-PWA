<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import BackButton from '@/components/BackButton.vue'
import TitleList from '@/components/list/TitleList.vue'
import { useTitle } from '@/composables/title'
import { isTauri } from '@/util/app'
import { getTauriVersion, getVersion } from '@tauri-apps/api/app'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

import AppCard from './components/AppCard.vue'

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
    summary: t('developer.westinyang.description'),
  },
  {
    qq: 2140125724,
    title: t('developer.eddie.name'),
    summary: t('developer.eddie.description'),
  },
])

const { smAndUp } = useDisplay()

const URL_SOURCE = 'https://gitee.com/ohos-dev/F-OH-PWA'
const URL_TERM_LICENSES = 'https://gitee.com/Jesse205/F-OH-PWA/blob/main/docs/terms/licenses_v1.0.0.md'

const tauriVersion = ref()

if (isTauri) {
  getTauriVersion().then((version) => {
    tauriVersion.value = version
  })
  getVersion().then((version) => {
    appVersion.value = version
  })
}
</script>

<template>
  <v-app-bar>
    <back-button />
    <v-app-bar-title>{{ $t('about.name') }}</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer v-if="smAndUp" permanent :width="200 + 32">
    <AppCard class="ma-4" />
  </v-navigation-drawer>
  <app-main>
    <v-container class="py-0">
      <AppCard v-if="!smAndUp" class="my-4" />
      <!-- 关于应用 -->
      <title-list class="my-4" lines="two" tag="ul" :title="$t('app.about')">
        <!-- 应用版本 -->
        <v-list-item prepend-icon="$info" :title="$t('app.version')" :subtitle="appVersion" />
        <!-- Tauri 版本 -->
        <v-list-item v-if="tauriVersion" prepend-icon="$info" :title="$t('tauri.version')" :subtitle="tauriVersion" />
        <v-list-item
          prepend-icon="$privacy"
          lines="one"
          :title="$t('term.licenses')"
          :href="URL_TERM_LICENSES"
          target="_blank"
          append-icon="$openInNew"
        />
      </title-list>

      <!-- 开发者信息 -->
      <title-list class="my-4" lines="two" :title="$t('develop.messages')">
        <v-list-item
          v-for="item in developers"
          :key="item.title"
          :prepend-avatar="item.avatar || `https://q1.qlogo.cn/g?b=qq&nk=${item.qq}&s=100`"
          :title="item.title"
          :subtitle="item.summary"
        />
        <v-list-item
          prepend-icon="$card"
          :title="$t('donate.name')"
          :to="{ name: 'Donate' }"
          append-icon="$next"
          lines="one"
        />
      </title-list>

      <!-- 交流讨论 -->
      <title-list class="my-4" lines="two" :title="$t('communicate.name')">
        <!-- QQ 群 -->
        <v-list-item
          prepend-icon="$group"
          :title="$t('communicate.qqGroup')"
          subtitle="752399947"
          href="https://qm.qq.com/q/jWeBdnvPz2"
          target="_blank"
          append-icon="$openInNew"
        />
      </title-list>

      <!-- 相关链接 -->
      <title-list class="my-4" lines="two" :title="$t('link.related')">
        <!-- 源代码 -->
        <v-list-item
          prepend-icon="$link"
          :title="$t('source.code')"
          :subtitle="URL_SOURCE"
          :href="URL_SOURCE"
          target="_blank"
          append-icon="$openInNew"
        />
        <v-list-item
          prepend-icon="$circle"
          :title="$t('link.foh.title')"
          :subtitle="$t('link.foh.description')"
          href="https://gitee.com/ohos-dev/f-oh"
          target="_blank"
          append-icon="$openInNew"
        />
        <v-list-item
          prepend-icon="$group"
          :title="$t('link.organization.title')"
          :subtitle="$t('link.organization.description')"
          href="https://gitee.com/ohos-dev"
          target="_blank"
          append-icon="$openInNew"
        />
      </title-list>
    </v-container>
  </app-main>
</template>

<!-- <style scoped></style> -->
