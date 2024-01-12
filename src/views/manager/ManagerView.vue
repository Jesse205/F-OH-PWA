<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import BackButton from '@/components/BackButton.vue'
import ProjectItem from '@/components/list/ProjectItem.vue'
import { useTokenSetting } from '@/composables/settings'
import { useTitle } from '@/composables/title'
import { URL_UPLOAD } from '@/constants/urls'
import type { AppInfo } from '@/ts/interfaces/app.interfaces'
import type { EditFileWork } from '@/ts/interfaces/gogs.interfaces'
import * as gogs from '@/util/gogs'
import { mdiCheck, mdiEyeOffOutline, mdiEyeOutline, mdiPlus } from '@mdi/js'
import { Base64 } from 'js-base64'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useTitle(computed(() => t('manager.apps')))

const snackbarVisible = ref(false)
const snackbar = ref<string | null>(null)

const token = useTokenSetting()
const tokenVisible = ref(false)
const tokenRules = {
  required: (value: string) => !!value || '必须填写此项',
}

const appsOriginRaw = ref<string | null>(null)
const appsRaw = ref<string | null>(null)
const apps = ref<AppInfo[] | null>(null)

watch(appsOriginRaw, (newAppsRaw) => {
  appsRaw.value = newAppsRaw
})

watch(appsRaw, (newAppsRaw) => {
  apps.value = newAppsRaw !== null ? JSON.parse(Base64.decode(newAppsRaw)) : null
})

const workList: EditFileWork[] = []

const loaded = computed(() => apps.value !== null)

const loading = ref(false)
const errMsg = ref<string | null>(null)

function fetchAllApps() {
  if (token.value === null) return
  loading.value = true
  gogs
    .getFileContent('ohos-dev', 'F-OH-Data', 'allAppList.json', { token: token.value })
    .then((data) => {
      console.log('success', data)
      if (data.encoding === 'base64') {
        appsOriginRaw.value = data.content
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

function handelPush(event: Event) {
  event.preventDefault()
}
</script>

<template>
  <v-app-bar>
    <BackButton />
    <v-app-bar-title>{{ $t('manager.apps') }}</v-app-bar-title>
    <v-menu origin="top" width="192" location="bottom" scrim="transparent">
      <template #activator="{ props: menu }">
        <v-btn icon="$more" v-bind="menu" />
      </template>
      <v-list>
        <v-list-item title="F-OH Data" :href="URL_UPLOAD" target="_blank" />
      </v-list>
    </v-menu>
  </v-app-bar>
  <app-main>
    <v-container class="pt-0 pb-16">
      <form>
        <v-text-field
          v-model="token"
          class="mt-4"
          :label="$t('token.name')"
          :type="tokenVisible ? 'text' : 'password'"
          prepend-inner-icon="$lock"
          :append-inner-icon="tokenVisible ? mdiEyeOffOutline : mdiEyeOutline"
          active
          :rules="[tokenRules.required]"
          hint="请进入“用户设置 > 授权应用”获取令牌"
          persistent-hint
          @click:append-inner="tokenVisible = !tokenVisible"
        >
          <template #append="{ isValid }">
            <v-btn :disabled="!isValid.value" @click="handelFetchApps">获取列表</v-btn>
          </template>
        </v-text-field>
        <v-alert v-if="errMsg" class="my-4" title="Load error" :text="errMsg" type="error" variant="tonal" />
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
  <v-snackbar :key="snackbar ?? undefined" v-model="snackbarVisible">{{ snackbar }}</v-snackbar>
  <div class="floating-btns">
    <v-btn v-show="loaded && workList.length > 0" class="btn" :icon="mdiCheck" @click="handelPush" />
    <v-btn v-show="loaded" class="btn" :icon="mdiPlus" @click="handelAddApp" />
  </div>
</template>

<style scoped lang="scss">
.floating-btns {
  position: fixed;
  bottom: 16px;
  right: 16px;
  .btn:not(:last-child) {
    margin-right: 16px;
  }
}
</style>
@/composables/title@/composables/settings @/constants/constants
