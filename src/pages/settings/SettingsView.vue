<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import BackButton from '@/components/appbar/BackButton.vue'
import AppListCategory from '@/components/list/AppListCategory.vue'
import AppListDialogItem from '@/components/list/AppListDialogItem.vue'
import AppListSingleSelectItem from '@/components/list/AppListSingleSelectItem.vue'
import { refTransformer } from '@/composables/converts'
import {
  usePageTransition,
  usePreferredApiUrl,
  usePreferredDesignLanguage,
  usePreferredLocale,
} from '@/composables/settings'
import { useTitle } from '@/composables/title'
import { designLanguageCodes, designLanguages, languages } from '@/data/settings'
import { useAppStore } from '@/store/app'
import { preferredApiUrl as currentPreferredApiUrl, overrideApiUrl } from '@/utils/url'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const appStore = useAppStore()

useTitle(computed(() => t('settings')))

const appVersion = __VERSION__

const language = refTransformer(locale, usePreferredLocale())
const preferredDesignLanguage = usePreferredDesignLanguage()

const isDesignChanged = computed(
  () =>
    appStore.design !== preferredDesignLanguage.value && designLanguageCodes.includes(preferredDesignLanguage.value),
)

const preferredApiUrl = usePreferredApiUrl()
const isPreferredApiUrlChanged = computed(() => (currentPreferredApiUrl ?? '') !== preferredApiUrl.value.trim())

const pageTransitionEnabled = usePageTransition()
</script>

<template>
  <v-layout>
    <v-app-bar>
      <back-button />
      <v-app-bar-title>{{ $t('settings') }}</v-app-bar-title>
    </v-app-bar>
    <app-main>
      <app-category-list class="ma-4">
        <app-list-category :subheader="$t('userInterface', 2)">
          <app-list-single-select-item
            v-model="preferredDesignLanguage"
            prepend-icon="$theme"
            :title="$t('designLanguage')"
            :items="designLanguages"
            :value-getter="(item) => item.code"
            :disabled-getter="(item) => item.disabled ?? false"
            :name-getter="(item) => item.name"
          >
            <v-list-item-subtitle v-if="isDesignChanged" class="color-warning">
              {{ $t('designLanguageTakeEffectMessage') }}
            </v-list-item-subtitle>
          </app-list-single-select-item>
          <app-list-single-select-item
            v-model="language"
            prepend-icon="$translate"
            :title="$t('language')"
            :items="languages"
            :value-getter="(item) => item.code"
            :name-getter="(item) => item.name"
          />
          <v-list-item
            prepend-icon="$info"
            :title="$t('pageHierarchyTransition')"
            @click="pageTransitionEnabled = !pageTransitionEnabled"
          >
            <template #append>
              <v-switch v-model="pageTransitionEnabled" tabindex="-1" />
            </template>
          </v-list-item>
        </app-list-category>
        <app-list-category :subheader="$t('app.title')">
          <app-list-dialog-item
            v-model="preferredApiUrl"
            prepend-icon="$circle"
            :title="$t('apiUrl')"
            :subtitle="preferredApiUrl.trim() || $t('notSet')"
          >
            <v-list-item-subtitle v-if="overrideApiUrl" class="color-warning">
              {{ $t('apiUrlOverrideMessage', { overrideApiUrl }) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="isPreferredApiUrlChanged" class="color-warning">
              {{ $t('apiUrlTakeEffectMessage') }}
            </v-list-item-subtitle>
          </app-list-dialog-item>
          <!-- 关于 -->
          <v-list-item
            prepend-icon="$info"
            :title="$t('about')"
            :subtitle="appVersion"
            :to="{ name: 'About' }"
            append-icon="$next"
          />
        </app-list-category>
      </app-category-list>
    </app-main>
  </v-layout>
</template>
