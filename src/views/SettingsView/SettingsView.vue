<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'

import { useTitle } from '@/composables/title'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isTauri } from '@/util/app'
import { getVersion } from '@tauri-apps/api/app'
import { useLocaleSetting, useServerSetting } from '@/composables/settings'
import { useTokenSetting } from '@/composables/settings'
import DialogListItem from '@/components/list/DialogListItem.vue'
import BackButton from '@/components/BackButton.vue'
import TitleList from '@/components/list/TitleList.vue'
import { URL_API } from '@/data/constants'

const { t, locale } = useI18n()

useTitle(computed(() => t('settings.name')))

const appVersion = ref(__VERSION__)
if (isTauri) {
  getVersion().then((version) => {
    appVersion.value = version
  })
}

const savedLocale = useLocaleSetting()
const selectedLocales = computed({
  get: () => [locale.value],
  set: (newLocales) => {
    savedLocale.value = newLocales[0]
  },
})

const token = useTokenSetting()

const server = useServerSetting()
</script>

<template>
  <v-app-bar>
    <back-button />
    <v-app-bar-title>{{ $t('settings.name') }}</v-app-bar-title>
  </v-app-bar>
  <app-main>
    <v-container class="py-0">
      <!-- 项目展示 -->
      <!-- <v-list-subheader>{{ $t('project.showcase.name') }}</v-list-subheader> -->
      <!-- 应用 -->
      <title-list class="my-4" :title="$t('app.name')">
        <v-list-item prepend-icon="$translate" :title="$t('locale.language')" :subtitle="$i18n.locale" link lines="two">
          <!-- origin="left" 修复小窗时定位错误 -->
          <v-menu activator="parent" scrim="rgba(0,0,0,0)" origin="left">
            <v-list v-model:selected="selectedLocales" select-strategy="single-leaf" mandatory>
              <v-list-item v-for="item in $i18n.availableLocales" :key="item" :title="item" :value="item" />
            </v-list>
          </v-menu>
        </v-list-item>

        <dialog-list-item
          v-model="token"
          prepend-icon="$lock"
          :title="$t('token.name')"
          :hint="$t('token.resolve_message')"
          lines="one"
        />
        <dialog-list-item
          v-model="server"
          prepend-icon="$circle"
          :title="$t('server.name')"
          :placeholder="URL_API"
          :subtitle="server.trim() || URL_API"
          lines="two"
        />

        <!-- 关于 -->
        <v-list-item
          prepend-icon="$info"
          :title="$t('about.name')"
          :subtitle="appVersion"
          :to="{ name: 'About' }"
          append-icon="$next"
          lines="two"
        >
        </v-list-item>
      </title-list>
    </v-container>
  </app-main>
</template>

<!-- <style scoped></style> -->
