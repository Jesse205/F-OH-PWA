<script setup lang="ts">
import BackButton from '@/components/appbar/BackButton.vue'
import { useLandscapeLayout } from '@/composables/layout'
import { useHomeRoutes } from '@/composables/route'
import { useTitle } from '@/composables/title'
import { PATH_MAIN } from '@/constants/urls'
import { homeRouteData } from '@/data/home'
import { usePwaStore } from '@/store/pwa'
import { parseI18n } from '@/utils/i18n'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import type MainCategoriesView from './MainCategoriesView.vue'
import type MainHomeView from './MainHomeView.vue'
import type MainMeView from './MainMeView.vue'
import type MainUpdateView from './MainUpdateView.vue'

const TAG = 'MainView'

const { activePagePosition, routeButtonReplace } = useHomeRoutes()

const currentRouteData = computed(() => {
  if (activePagePosition.value !== null) {
    return homeRouteData[activePagePosition.value]
  } else {
    return homeRouteData[0]
  }
})

const { t } = useI18n()

useTitle(
  computed(() => {
    if (currentRouteData.value) {
      return parseI18n(currentRouteData.value.title, t)
    }
    return null
  }),
)

const { smAndDown } = useDisplay()
const { isLandscapeNeeded } = useLandscapeLayout()

const navigationBarType = computed(() => {
  if (isLandscapeNeeded.value && smAndDown.value) {
    return 'rail'
  } else if (smAndDown.value) {
    return 'bottom'
  } else {
    return null
  }
})

// PWA
const pwaStore = usePwaStore()

type HomeComponent = InstanceType<
  typeof MainHomeView | typeof MainCategoriesView | typeof MainUpdateView | typeof MainMeView
>
const routeComponent = ref<HomeComponent>()

/**
 * 刷新当前页面的数据
 */
function refresh() {
  const component = routeComponent.value
  if (component && 'refresh' in component) {
    component.refresh()
  }
}

const router = useRouter()

onBeforeRouteUpdate((to) => {
  const { back: backFullPath } = router.options.history.state
  if (to.path?.startsWith(PATH_MAIN) && backFullPath && new URL(backFullPath, location.href).pathname === to.path) {
    history.go(-1)
    console.info(TAG, `Backing to '${to.path}' because history.state.back='${backFullPath}'. state may lost!`)
    return false
  }
})
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-if="navigationBarType === 'rail'" permanent rail>
      <div class="rail-list-container">
        <v-list class="rail-list" density="compact" nav active-class="">
          <v-list-item
            v-for="(item, index) in homeRouteData"
            :key="item.name"
            :to="{ name: item.name, replace: routeButtonReplace }"
            :prepend-icon="activePagePosition === index ? item.activeIcon : item.icon"
            :title="parseI18n(item.title, $t)"
            :disabled="item.disabled"
          />
        </v-list>
      </div>
    </v-navigation-drawer>
    <!-- 应用栏 -->
    <v-app-bar>
      <!--
      - 当设备为大屏时，首页隐藏按钮，其他页面显示按钮，这是通用逻辑。
      - 当设备为小屏时，始终隐藏按钮。
      - 例外情况：首页但是有历史记录，始终显示按钮。
      -->
      <back-button v-if="!smAndDown" />
      <v-app-bar-title>{{ parseI18n(currentRouteData.title, $t) }}</v-app-bar-title>
      <v-menu origin="bottom" width="172" location="top">
        <template #activator="{ props: menu }">
          <v-btn v-tooltip="$t('moreOptions')" icon="$more" v-bind="{ ...menu }" />
        </template>
        <v-list>
          <v-list-item v-if="currentRouteData?.refreshable" :title="$t('action.refresh')" @click="refresh" />
          <v-list-item
            v-if="pwaStore.installBtnVisible"
            :title="$t('action.installApp')"
            @click="pwaStore.onInstallBtnClick"
          />
          <v-list-item :title="$t('about')" :to="{ name: 'About' }" />
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- 主视图 -->
    <router-view #="{ Component }">
      <keep-alive>
        <component :is="Component" ref="routeComponent" />
      </keep-alive>
    </router-view>

    <!-- 底部导航栏 -->
    <v-bottom-navigation v-if="navigationBarType === 'bottom'">
      <v-btn
        v-for="item in homeRouteData"
        :key="item.name"
        :to="{ name: item.name, replace: routeButtonReplace }"
        :disabled="item.disabled"
      >
        <v-icon>{{ $route.name === item.name ? item.activeIcon : item.icon }}</v-icon>
        <span>{{ parseI18n(item.title, $t) }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<style lang="scss">
.rail-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
