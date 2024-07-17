import { PATH_API_ALL_APP } from '@/constants/urls'
import type { AppInfo } from '@/utils/apps'
import { apiAxios } from '@/utils/http'
import { useAxios } from '@vueuse/integrations/useAxios'
import { defineStore } from 'pinia'

const TAG = '[AppsStore]'

/**
 * 应用市场所有应用数据
 */
export const useAppsStore = defineStore('apps', () => {
  const { data, isFinished, isLoading, error, execute } = useAxios<AppInfo[]>(PATH_API_ALL_APP, apiAxios, {})

  function refreshData() {
    execute()
  }
  function ensureData() {
    execute()
  }

  /**
   * 上传拉取数据时的服务器地址，用于判断数据是否过时
   */
  // let apiUrl = getApiUrl()

  /**
   * 获取所有 APP 数据
   */
  /* function fetchData() {
    if (loading.value) return
    loading.value = true
    errMsg.value = null
    getAxiosInstance()
      .get<AppInfo[]>(getAllAppsApiUrl())
      .then((response) => {
        assert(typeof response.data === 'object', "Data isn't object.")
        if (IS_DEV_MODE) console.debug(TAG, 'Fetched apps', response.data)
        data.value = response.data
        errMsg.value = null
      })
      .catch((reason) => {
        console.error(TAG, "Can't load data:", reason)
        errMsg.value = reason.toString()
      })
      .finally(() => {
        loading.value = false
      })
  } */

  /* function clearData() {
    data.value = null
    errMsg.value = null
  } */

  /**
   * 确保所有 APP 数据已经获取到或者正在获取中
   */
  /* function ensureData() {
    const newServer = getApiUrl()
    if ((apiUrl !== newServer || data.value === null) && !loading.value) {
      if (apiUrl !== newServer) {
        clearData()
      }
      fetchData()
    }
  } */

  /**
   * 当服务器链接变化时，自动刷新
   *
   * 需要在组件的 `setup` 内调用。
   */
  /* function autoRefresh() {
    // 不能在 store 里面调用 `usePreferredServerUrl`，否则路由切换会丢失响应式。也不能注册监听事件，避免不必要的性能损耗。
    const preferredApiUrl = usePreferredApiUrl()
    let activated = false
    watch(preferredApiUrl, () => {
      if (activated) fetchData()
    })
    onActivated(() => {
      if (preferredApiUrl.value !== server) fetchData()
      activated = true
    })
    onDeactivated(() => {
      activated = false
    })
  } */

  return { data, isFinished, isLoading, error, ensureData, refreshData }
})
