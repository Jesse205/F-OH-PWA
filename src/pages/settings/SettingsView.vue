<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import BackButton from '@/components/appbar/BackButton.vue'
import DialogListItem from '@/components/list/DialogListItem.vue'
import TitleList from '@/components/list/TitleList.vue'
import {
  usePageTransition,
  usePreferredDesignLanguage,
  usePreferredLocale,
  usePreferredServerUrl,
} from '@/composables/settings'
import { useTitle } from '@/composables/title'
import { designLanguageCodes, designLanguages, languages } from '@/data/settings'
import { useAppStore } from '@/store/app'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const appStore = useAppStore()

useTitle(computed(() => t('settings')))

const appVersion = __VERSION__

const preferredLocale = usePreferredLocale()
const selectedLocales = computed({
  get: () => [locale.value],
  set: (newLocales) => {
    preferredLocale.value = newLocales[0]
  },
})
const displayLanguage = computed(() => {
  return languages.find((item) => item.code === locale.value)?.name || locale.value
})

const preferredDesign = usePreferredDesignLanguage()
const selectedDesigns = computed({
  get: () => [preferredDesign.value],
  set: (newDesigns) => {
    preferredDesign.value = newDesigns[0]
  },
})
const displayDesign = computed(() => {
  return designLanguages.find((item) => item.code === preferredDesign.value)?.name || preferredDesign.value
})
const isDesignChanged = computed(
  () => appStore.design !== preferredDesign.value && designLanguageCodes.includes(preferredDesign.value),
)

const server = usePreferredServerUrl()

const pageTransitionEnabled = usePageTransition()
</script>

<template>
  <v-app-bar>
    <back-button />
    <v-app-bar-title>{{ $t('settings') }}</v-app-bar-title>
  </v-app-bar>
  <app-main>
    <v-container class="py-0">
      <title-list class="my-4" :title="$t('userInterface', 2)">
        <v-list-item prepend-icon="$translate" :title="$t('designLanguage')" link>
          <!-- origin="left" 修复小窗时定位错误 -->

          <v-menu activator="parent" origin="left">
            <v-list v-model:selected="selectedDesigns" select-strategy="single-leaf" mandatory>
              <v-list-item
                v-for="item in designLanguages"
                :key="item.code"
                :title="item.name"
                :value="item.code"
                :disabled="item.disabled"
              />
            </v-list>
          </v-menu>
          <template #subtitle>
            {{ displayDesign }}
            <p class="color-warning" v-if="isDesignChanged">* The new design language will take effect after reload.</p>
          </template>
        </v-list-item>

        <v-list-item prepend-icon="$translate" :title="$t('language')" :subtitle="displayLanguage" link>
          <!-- origin="left" 修复小窗时定位错误 -->
          <v-menu activator="parent" origin="left">
            <v-list v-model:selected="selectedLocales" select-strategy="single-leaf" mandatory>
              <v-list-item v-for="item in languages" :key="item.code" :title="item.name" :value="item.code" />
            </v-list>
          </v-menu>
        </v-list-item>
        <v-list-item
          :active="pageTransitionEnabled"
          prepend-icon="$info"
          title="Page transition"
          active-class="ignore-active-style"
          @click="pageTransitionEnabled = !pageTransitionEnabled"
        >
          <template #append>
            <v-switch v-model="pageTransitionEnabled" />
          </template>
        </v-list-item>
      </title-list>

      <!-- 应用 -->
      <title-list class="my-4" :title="$t('app.title')">
        <dialog-list-item
          v-model="server"
          prepend-icon="$circle"
          :title="$t('server')"
          :subtitle="server.trim() || $t('notSet')"
        />
        <!-- 关于 -->
        <v-list-item
          prepend-icon="$info"
          :title="$t('about')"
          :subtitle="appVersion"
          :to="{ name: 'About' }"
          append-icon="$next"
        />
      </title-list>
    </v-container>
  </app-main>
</template>
