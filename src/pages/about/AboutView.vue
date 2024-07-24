<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import BackButton from '@/components/appbar/BackButton.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import { useTitle } from '@/composables/title'
import { URL_SOURCE } from '@/constants/urls'
import { developers } from '@/data/developers'
import { isTauriApp } from '@/utils/app'
import { parseI18n } from '@/utils/i18n'
import { getAvatarUrl } from '@/utils/qq'
import { getTauriVersion } from '@tauri-apps/api/app'
import { computed, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
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
    <v-navigation-drawer v-if="smAndUp" permanent :width="200 + 32" touchless>
      <AppCard class="ma-4" />
    </v-navigation-drawer>
    <app-main>
      <v-container class="py-0">
        <AppCard v-if="!smAndUp" class="my-4" />
        <app-category-list class="my-4">
          <!-- 关于应用 -->
          <app-list-category :subheader="$t('aboutApp')">
            <v-list-item prepend-icon="$info" :title="$t('version.app')" :subtitle="appVersion" />
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
          </app-list-category>
          <!-- 开发者信息 -->
          <app-list-category :subheader="$t('developInfo')">
            <v-list-item
              v-for="item in developers"
              :key="item.title"
              :prepend-avatar="item.avatar || (item.qq ? getAvatarUrl(item.qq) : undefined)"
              :title="parseI18n(item.title, $t)"
              :subtitle="parseI18n(item.summary, $t)"
            />
            <v-list-item
              prepend-icon="$card"
              :title="$t('action.donate')"
              :to="{ name: 'Donate' }"
              append-icon="$next"
            />
          </app-list-category>
          <!-- 交流讨论 -->
          <app-list-category :subheader="$t('action.communicate')">
            <!-- QQ 群 -->
            <v-list-item
              prepend-icon="$group"
              :title="$t('app.qqGroup')"
              subtitle="528608689"
              href="https://qm.qq.com/q/CDSFf6DvVK"
              target="_blank"
              append-icon="$openInNew"
            />
          </app-list-category>
          <!-- 相关链接 -->
          <app-list-category :subheader="$t('relatedLinks')">
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
          </app-list-category>
        </app-category-list>
      </v-container>
    </app-main>
  </v-layout>
</template>
