<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import { useTitle } from '@/events/title'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { URL_UPLOAD, URL_API_GOGS } from '@/data/constants'
import { AppInfo } from '@/ts/interfaces/app.interfaces'
import { GOGS_CONTENT_FILE } from '@/ts/interfaces/gogs.interfaces'
import { Base64 } from 'js-base64'
import ProjectItem from '@/components/ProjectItem.vue'
import { toJsonIfOk } from '@/util/fetch'
import { useToken } from '@/events/settings';
const { t } = useI18n()

useTitle(computed(() => t('manager.apps')))

const snackbarVisible = ref(false)
const snackbar = ref<string | null>(null)

const token = useToken()
const tokenVisible = ref(false)
const tokenRules = {
  required: (value: string) => !!value || '必须填写此项'
}

const appsRaw = ref<string | null>(null)
const apps = ref<AppInfo[] | null>(null)

watch(appsRaw, (newAppsRaw) => {
  apps.value = newAppsRaw !== null ? JSON.parse(Base64.decode(newAppsRaw)) : null
})

const loaded = computed(() => apps.value !== null)

const loading = ref(false)
const errMsg = ref<string | null>(null)

function fetchAllApps() {
  loading.value = true
  fetch(`${URL_API_GOGS}/repos/ohos-dev/F-OH-Data/contents/allAppList.json?ref=master&token=${token.value}`)
    .then(toJsonIfOk)
    .then((data: GOGS_CONTENT_FILE) => {
      console.log('success', data)
      if (data.encoding === 'base64') {
        appsRaw.value = data.content
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

function pushSnackBar(text: string) {
  snackbarVisible.value = true
  snackbar.value = text
}

function handelFetchApps(event: Event) {
  event.preventDefault()
  fetchAllApps()
}

function handelAddApp(event: Event) {
  event.preventDefault()
  if (!loaded.value) {
    pushSnackBar('请先获取应用列表')
    return
  }
}
</script>

<template>
  <v-app-bar flat border="b">
    <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
    <v-app-bar-title>{{ $t('manager.apps') }}</v-app-bar-title>
    <v-menu origin="top" width="192" location="top" scrim="transparent">
      <template v-slot:activator="{ props: menu }">
        <v-btn icon="mdi-dots-vertical" v-bind="menu" />
      </template>
      <v-list>
        <v-list-item title="F-OH Data" :href="URL_UPLOAD" target="_blank" />
      </v-list>
    </v-menu>
  </v-app-bar>
  <app-main>
    <v-container class="py-0">
      <form>
        <v-text-field
          v-model="token"
          class="mt-4"
          :label="$t('token.name')"
          variant="outlined"
          :type="tokenVisible ? 'text' : 'password'"
          prepend-inner-icon="mdi-key-outline"
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
  <v-snackbar v-model="snackbarVisible" :key="snackbar ?? undefined">{{ snackbar }}</v-snackbar>
  <v-btn icon="mdi-plus" class="floating-btn" @click="handelAddApp" />
</template>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
