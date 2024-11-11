<script setup lang="ts">
import { getTauriVersion } from '@tauri-apps/api/app'
import { computed, type Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

import { useTitle } from '@/composables/title'
import { URL_SOURCE } from '@/constants/urls'
import { developers } from '@/data/developers'
import { isTauriApp } from '@/utils/global'
import { parseI18n } from '@/utils/i18n'
import { getAvatarUrl } from '@/utils/qq'

import AppCard from './components/AppCard.vue'

const { t } = useI18n()
const title = useTitle(computed(() => t('about')))

const appVersion = __VERSION__

const { smAndUp } = useDisplay()

let tauriVersion: Ref<string | undefined> | undefined = undefined

if (isTauriApp) {
  tauriVersion = ref<string>()
  getTauriVersion().then((version) => {
    tauriVersion!.value = version
  })
}
</script>

<template>
  <app-page>
    <v-app-bar>
      <back-button />
      <v-app-bar-title :text="title" />
    </v-app-bar>
    <v-navigation-drawer v-if="smAndUp" permanent :width="200 + 32" touchless>
      <AppCard un-margin="4" />
    </v-navigation-drawer>
    <v-main scrollable>
      <AppCard v-if="!smAndUp" un-margin="4" />
      <app-list class="v-list--with-prepend-icon" un-margin="4" divider-inset>
        <!-- 关于应用 -->
        <app-list-category :subheader="$t('aboutApp')">
          <app-list-item prepend-icon="$info" :title="$t('version.app')" :subtitle="appVersion" />
          <app-list-item
            v-if="isTauriApp"
            prepend-icon="$info"
            :title="$t('version.tauri')"
            :subtitle="tauriVersion ?? $t('loading')"
          />
          <app-list-item
            prepend-icon="$about_licenses"
            :title="$t('term.openSourceLicenses')"
            :to="{ name: 'Licenses' }"
            append-icon="$next"
            lastInVertical
          />
        </app-list-category>
        <!-- 开发者信息 -->
        <app-list-category :subheader="$t('developInfo')">
          <app-list-item
            v-for="item in developers"
            :key="item.title"
            :prepend-avatar="item.avatar || (item.qq ? getAvatarUrl(item.qq) : undefined)"
            :title="parseI18n(item.title, $t)"
            :subtitle="parseI18n(item.summary, $t)"
          />
          <app-list-item
            prepend-icon="$about_donate"
            :title="$t('action.donate')"
            :to="{ name: 'Donate' }"
            append-icon="$next"
            lastInVertical
          />
        </app-list-category>
        <!-- 交流讨论 -->
        <app-list-category :subheader="$t('action.communicate')">
          <!-- QQ 群 -->
          <app-list-item
            prepend-icon="$about_group"
            :title="$t('app.qqGroup')"
            subtitle="528608689"
            href="https://qm.qq.com/q/CDSFf6DvVK"
            target="_blank"
            append-icon="$openInNew"
            lastInVertical
          />
        </app-list-category>
        <!-- 相关链接 -->
        <app-list-category :subheader="$t('relatedLinks')">
          <app-list-item
            prepend-icon="$link"
            :title="$t('sourceCode')"
            :subtitle="URL_SOURCE"
            :href="URL_SOURCE"
            target="_blank"
            append-icon="$openInNew"
          />
          <app-list-item
            prepend-icon="$foh"
            :title="$t('link.foh.title')"
            :subtitle="$t('link.foh.description')"
            href="https://gitee.com/ohos-dev/f-oh"
            target="_blank"
            append-icon="$openInNew"
          />
          <app-list-item
            prepend-icon="$about_group"
            :title="$t('link.organization.title')"
            :subtitle="$t('link.organization.description')"
            href="https://gitee.com/ohos-dev"
            target="_blank"
            append-icon="$openInNew"
            lastInVertical
          />
        </app-list-category>
      </app-list>
    </v-main>
  </app-page>
</template>
