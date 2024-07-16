<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import BackButton from '@/components/appbar/BackButton.vue'
import TitleList from '@/components/list/AppList.vue'
import { useTitle } from '@/composables/title'
import { isTauriApp } from '@/utils/app'
import { getTauriVersion } from '@tauri-apps/api/app'
import { computed, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

import { URL_SOURCE } from '@/constants/urls'
import { developers } from '@/data/developers'
import { parseI18n } from '@/utils/i18n'
import { getAvatarUrl } from '@/utils/qq'
import AppCard from './components/AppCard.vue'

const { t } = useI18n()
useTitle(computed(() => t('about')))

const appVersion = ref(__VERSION__)

const { smAndUp } = useDisplay()

const URL_TERM_LICENSES = `${URL_SOURCE}/blob/main/docs/terms/licenses_v1.0.0.md`

let tauriVersion: Ref<string | undefined>

if (isTauriApp) {
  tauriVersion = ref<string>()
  getTauriVersion().then((version) => {
    tauriVersion.value = version
  })
}
</script>

<template>
  <v-layout>
    <v-app-bar>
      <back-button />
      <v-app-bar-title>{{ $t('about') }}</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-if="smAndUp" permanent :width="200 + 32">
      <AppCard class="ma-4" />
    </v-navigation-drawer>
    <app-main>
      <v-container class="py-0">
        <AppCard v-if="!smAndUp" class="my-4" />
        <!-- 关于应用 -->
        <title-list class="my-4" tag="ul" :title="$t('aboutApp')">
          <!-- 应用版本 -->
          <v-list-item prepend-icon="$info" :title="$t('version.app')" :subtitle="appVersion" />
          <!-- Tauri 版本 -->
          <v-list-item
            v-if="isTauriApp"
            prepend-icon="$info"
            :title="$t('version.tauri')"
            :subtitle="tauriVersion ?? $t('loading')"
          />
          <v-list-item
            prepend-icon="$privacy"
            :title="$t('term.openSourceLicenses')"
            :href="URL_TERM_LICENSES"
            target="_blank"
            append-icon="$openInNew"
          />
        </title-list>

        <!-- 开发者信息 -->
        <title-list class="my-4" :title="$t('developInfo')">
          <v-list-item
            v-for="item in developers"
            :key="item.title"
            :prepend-avatar="item.avatar || (item.qq && getAvatarUrl(item.qq))"
            :title="parseI18n(item.title, $t)"
            :subtitle="parseI18n(item.summary, $t)"
          />
          <v-list-item prepend-icon="$card" :title="$t('action.donate')" :to="{ name: 'Donate' }" append-icon="$next" />
        </title-list>

        <!-- 交流讨论 -->
        <title-list class="my-4" :title="$t('action.communicate')">
          <!-- TODO: 修改群号 -->
          <!-- QQ 群 -->
          <v-list-item
            prepend-icon="$group"
            :title="$t('app.qqGroup')"
            subtitle="528608689"
            href="https://qm.qq.com/q/CDSFf6DvVK"
            target="_blank"
            append-icon="$openInNew"
          />
        </title-list>

        <!-- 相关链接 -->
        <title-list class="my-4" :title="$t('relatedLinks')">
          <!-- 源代码 -->
          <v-list-item
            prepend-icon="$link"
            :title="$t('sourceCode')"
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
  </v-layout>
</template>
