import { useLogDebug } from '@/composables/logger'
import { useDisplayMode } from '@/composables/pwa'
import { IS_DEV_MODE } from '@/constants'
import { isTauriApp } from '@/utils/app'
import { isPwaDisplayMode } from '@/utils/pwa'
import { getPreferredDesignLanguage } from '@/utils/settings'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const TAG = '[AppStore]'

/**
 * 应用全局数据
 */
export const useAppStore = defineStore('app', () => {
  const { t } = useI18n()
  /**
   * 应用标题，不带后缀
   */
  const title = ref<string>()

  /**
   * 显示模式，常用于判断是否处于PWA模式
   */
  const displayMode = useDisplayMode()

  /**
   * 应用名称，动态切换不同名称
   */
  const appName = computed<string>(() => {
    if (isTauriApp) {
      return t('appName.tauri')
    } else if (isPwaDisplayMode(displayMode.value)) {
      return t('appName.pwa')
    } else {
      return t('appName.browser')
    }
  })

  if (IS_DEV_MODE) {
    useLogDebug(TAG, 'New title:', title)
    useLogDebug(TAG, 'New app name:', appName)
  }

  /**
   * 设计语言不支持动态切换
   */
  const design = getPreferredDesignLanguage()

  return { appName, displayMode, title, design }
})
