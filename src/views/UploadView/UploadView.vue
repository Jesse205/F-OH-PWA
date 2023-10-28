<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import { useTitle } from '@/events/title'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { URL_UPLOAD, URL_API_GOGS } from '@/data/constants'
import { useLocalStorage } from '@vueuse/core'

const { t } = useI18n()

useTitle(computed(() => t('upload.app')))

const token = useLocalStorage('token', null)
const tokenVisible = ref(false)
const tokenRules = {
  required: (value: string) => !!value || '必须填写此项'
}

const headers: HeadersInit = {}

watch(token, (newToken) => {
  // headers.Authorization = `token ${newToken}`
})

function fetchAllApps(event: Event) {
  event.preventDefault()
  fetch(`${URL_API_GOGS}/repos/ohos-dev/F-OH-Data/contents/allAppList.json?ref=master&token=${token.value}`, {})
    .then((res) => res.json())
    .then((data) => {
      console.log('success', data)
    })
    .catch((err) => {
      console.error('error', err)
    })
}
</script>

<template>
  <v-app-bar flat border="b">
    <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
    <v-app-bar-title>{{ $t('upload.app') }}</v-app-bar-title>
    <v-menu origin="top" width="192" location="top" scrim="transparent">
      <template v-slot:activator="{ props: menu }">
        <v-btn icon="mdi-dots-vertical" v-bind="menu" />
      </template>
      <v-list>
        <v-list-item :title="$t('upload.app')" :href="URL_UPLOAD" target="_blank" />
      </v-list>
    </v-menu>
  </v-app-bar>
  <app-main>
    <v-container>
      <v-text-field
        v-model="token"
        label="令牌"
        variant="outlined"
        :type="tokenVisible ? 'text' : 'password'"
        prepend-inner-icon="mdi-key"
        :append-inner-icon="tokenVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        @click:append-inner="tokenVisible = !tokenVisible"
        active
        :rules="[tokenRules.required]"
      >
        <template v-slot:append="{ isValid }">
          <v-btn @click="fetchAllApps" :disabled="!isValid.value">获取列表</v-btn>
        </template>
      </v-text-field>

      该功能正在开发，敬请期待。请选择菜单内应用上传进入 F-OH Data 手动上传文件
    </v-container>
  </app-main>
</template>

<style scoped></style>
