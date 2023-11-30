<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'

import { useTitle } from '@/events/title'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isTauri } from '@/util/app'
import { getVersion } from '@tauri-apps/api/app'
import { useLocaleSetting } from '@/events/settings'
import { useTokenSetting } from '@/events/settings'
import DialogListItem from '@/components/list/DialogListItem.vue'
import BackButton from '@/components/BackButton.vue'

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
</script>

<template>
  <v-app-bar>
    <back-button />
    <v-app-bar-title>{{ $t('settings.name') }}</v-app-bar-title>
  </v-app-bar>
  <app-main>
    <v-container class="container">
      <v-list class="ma-4" active-class="noActivatedOverlay">
        <!-- 项目展示 -->
        <!-- <v-list-subheader>{{ $t('project.showcase.name') }}</v-list-subheader> -->
        <!-- 应用 -->
        <!-- <v-divider></v-divider> -->
        <v-list-subheader>{{ $t('app.name') }}</v-list-subheader>
        <v-list-item
          prepend-icon="mdi-translate"
          class="noActivatedOverlay"
          :title="$t('locale.language')"
          :subtitle="$i18n.locale"
          link
          lines="two"
        >
          <!-- origin="left" 修复小窗时定位错误 -->
          <v-menu activator="parent" scrim="rgba(0,0,0,0)" origin="left">
            <v-list v-model:selected="selectedLocales" select-strategy="single-leaf" mandatory>
              <v-list-item v-for="item in $i18n.availableLocales" :key="item" :title="item" :value="item" />
            </v-list>
          </v-menu>
        </v-list-item>

        <dialog-list-item
          v-model="token"
          prepend-icon="mdi-key-outline"
          class="noActivatedOverlay"
          :title="$t('token.name')"
          hint="请进入“用户设置 > 授权应用”获取令牌"
          lines="one"
        />

        <!-- 关于 -->
        <v-list-item
          prepend-icon="mdi-information-outline"
          :title="$t('about.name')"
          :subtitle="appVersion"
          :to="{ name: 'About' }"
          append-icon="mdi-chevron-right"
          lines="two"
        >
        </v-list-item>
      </v-list>
    </v-container>
  </app-main>
</template>

<style scoped>
.container {
  padding: 0;
}
</style>
