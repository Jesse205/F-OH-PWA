<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'

import { useTitle } from '@/events/title';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { isTauri } from '@/util/app';
import { getVersion } from '@tauri-apps/api/app';
import { useLocaleSetting } from '@/events/settings';

const { t, locale } = useI18n()

useTitle(computed(() => t('settings.name')))

const appVersion = ref(__VERSION__)
if (isTauri()) {
  getVersion().then((version) => {
    appVersion.value = version
  })
}

const savedLocale = useLocaleSetting()
const selectedLocales = ref([locale.value])
watch(selectedLocales, (newLocales) => {
  savedLocale.value = newLocales[0]
})

</script>

<template>
  <v-app-bar flat border="b">
    <v-btn v-if="$router.options.history.state.back" icon="mdi-arrow-left" @click.stop="$router.back" />
    <v-app-bar-title>{{ $t('settings.name') }}</v-app-bar-title>
  </v-app-bar>
  <app-main>
    <v-container class="container">
      <v-list lines="two" active-class="noActivatedOverlay">
        <!-- 项目展示 -->
        <!-- <v-list-subheader>{{ $t('project.showcase.name') }}</v-list-subheader> -->
        <!-- 应用 -->
        <!-- <v-divider></v-divider> -->
        <v-list-subheader>{{ $t('app.name') }}</v-list-subheader>
        <v-list-item prepend-icon="mdi-translate" class="noActivatedOverlay" :title="$t('locale.language')"
          :subtitle="$i18n.locale" link>
          <!-- origin="left" 修复小窗时定位错误 -->
          <v-menu activator="parent" scrim="rgba(0,0,0,0)" origin="left">
            <v-list select-strategy="single-leaf" v-model:selected="selectedLocales" mandatory>
              <v-list-item v-for="item in $i18n.availableLocales" :key="item" :title="item" :value="item" />
            </v-list>
          </v-menu>
        </v-list-item>
        <!-- 关于 -->
        <v-list-item prepend-icon="mdi-information-outline" :title="$t('about.name')" :subtitle="appVersion"
          :to="{ name: 'About' }" append-icon="mdi-chevron-right">
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
