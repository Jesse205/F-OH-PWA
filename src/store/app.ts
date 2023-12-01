import { useDisplayMode } from '@/events/pwa'
import { APP_NAME_DEFAULT, APP_NAME_PWA, APP_NAME_TAURI } from '@/locales'
import { isTauri } from '@/util/app'
import { isPwaDisplayMode } from '@/util/pwa'
import { getName } from '@tauri-apps/api/app'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * 应用全局数据
 */
export const useAppStore = defineStore('app', () => {
  const { t } = useI18n()
  /**
   * 应用标题，不带后缀
   */
  const title = ref<string | null>(null)

  /**
   * 应用名称，动态切换不同名称
   */
  const appName = ref<string>(t('appName'))

  /**
   * 显示模式，常用于判断是否处于PWA模式
   */
  const displayMode = useDisplayMode()
  if (import.meta.env.DEV) {
    watch(
      title,
      (newTitle) => {
        console.debug('NewTitle', newTitle)
      },
      { immediate: true },
    )
  }

  // Tauri 中就用真实的应用名
  if (isTauri) {
    appName.value = APP_NAME_TAURI
    getName().then((name) => {
      appName.value = name
    })
  } else {
    watch(
      displayMode,
      (newDisplayMode) => {
        if (isPwaDisplayMode(newDisplayMode)) {
          appName.value = APP_NAME_PWA
        } else {
          appName.value = APP_NAME_DEFAULT
        }
      },
      { immediate: true },
    )
  }
  return { appName, displayMode, title }
})
