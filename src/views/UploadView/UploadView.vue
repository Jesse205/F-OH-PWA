<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import { useTitle } from '@/events/title'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { URL_UPLOAD, URL_API_GOGS } from '@/data/constants'
import { useLocalStorage } from '@vueuse/core'
import { AppInfo } from '@/ts/interfaces/app.interfaces'
import { GOGS_CONTENT_FILE } from '@/ts/interfaces/gogs.interfaces'
import { Base64 } from 'js-base64'
import ProjectItem from '@/components/ProjectItem.vue'
import { toJsonIfOk } from '@/util/fetch'
const { t } = useI18n()

useTitle(computed(() => t('upload.app')))

const token = useLocalStorage('token', null)
const tokenVisible = ref(false)
const tokenRules = {
  required: (value: string) => !!value || '必须填写此项'
}
const apps = ref<AppInfo[] | null>([])

const loading = ref(false)
const errMsg = ref<string | null>(null)

function fetchAllApps(event: Event) {
  loading.value = true
  fetch(`${URL_API_GOGS}/repos/ohos-dev/F-OH-Data/contents/allAppList.json?ref=master&token=${token.value}`)
    .then(toJsonIfOk)
    .then((data: GOGS_CONTENT_FILE) => {
      console.log('success', data)
      if (data.encoding === 'base64') {
        apps.value = JSON.parse(Base64.decode(data.content))
      }
      errMsg.value = null
    })
    .catch((reason) => {
      console.error('error', reason)
      errMsg.value = reason.toString()
    })
    .finally(() => {
      loading.value = false
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
    <v-container class="py-0">
      <form>
        <v-text-field
          v-model="token"
          class="mt-4"
          label="令牌"
          variant="outlined"
          :type="tokenVisible ? 'text' : 'password'"
          prepend-inner-icon="mdi-key"
          :append-inner-icon="tokenVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="tokenVisible = !tokenVisible"
          active
          :rules="[tokenRules.required]"
          hint="请进入“用户设置 > 授权应用”获取令牌"
          persistent-hint
        >
          <template v-slot:append="{ isValid }">
            <v-btn @click="fetchAllApps" :disabled="!isValid.value">获取列表</v-btn>
          </template>
        </v-text-field>
        <v-alert class="my-4" v-if="errMsg" title="Load error" :text="errMsg" type="error" variant="tonal" />
        <v-alert
          class="my-4"
          title="该功能正在开发，敬请期待"
          text="请选择菜单内应用上传进入 F-OH Data 手动上传文件"
          type="info"
          variant="tonal"
        />
        <v-list v-if="apps?.length" class="my-4" border rounded="lg">
          <v-list-subheader>所有应用</v-list-subheader>
          <ProjectItem v-for="item in apps" :key="item.id" :item="item" :to="false" />
        </v-list>
      </form>
    </v-container>
  </app-main>
</template>

<style scoped></style>
