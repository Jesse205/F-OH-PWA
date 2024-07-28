import { PATH_API_ALL_APP } from '@/constants/urls'
import type { AppInfo } from '@/utils/apps'
import { apiAxios } from '@/utils/http'
import { useAxios } from '@vueuse/integrations/useAxios'
import { defineStore } from 'pinia'
import { computed } from 'vue'

const TAG = '[AppsStore]'

/**
 * 应用市场所有应用数据
 */
export const useAppsStore = defineStore('apps', () => {
  const { data, isFinished, isLoading, error, execute } = useAxios<AppInfo[]>(PATH_API_ALL_APP, apiAxios)
  const isLoaded = computed(() => data.value !== undefined)

  function refreshData() {
    execute()
  }
  function ensureData() {
    if (isLoaded.value || isLoading.value) return
    execute()
  }

  return { data, isFinished, isLoading, error, isLoaded, ensureData, refreshData }
})
