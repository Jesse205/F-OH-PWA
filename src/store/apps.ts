// Utilities
import { useServerSetting } from '@/composables/settings'
import { IS_DEV_MODE } from '@/data/constants'
import type { AppInfo } from '@/ts/interfaces/app.interfaces'
import { assert } from '@/util/app'
import { getAxiosInstance } from '@/util/fetch'
import { getAllAppsListApiUrl, getApiUrl } from '@/util/url'
import { defineStore } from 'pinia'
import { onActivated, onDeactivated, ref, watch } from 'vue'

const TAG = '[AppsStore]'

/**
 * 应用市场所有应用数据
 */
export const useAppsStore = defineStore('apps', () => {
  const loading = ref(false)
  const data = ref<AppInfo[] | null>(null)
  const errMsg = ref<string | null>(null)

  // 用于判断数据是否过时
  let server: string | undefined

  /**
   * 获取所有 APP 数据
   */
  function fetchData() {
    if (loading.value) return
    const newServer = getApiUrl()
    if (server !== newServer) {
      clearData()
    }
    server = newServer
    loading.value = true
    errMsg.value = null
    getAxiosInstance()
      .get<AppInfo[]>(getAllAppsListApiUrl())
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
  }

  function clearData() {
    data.value = null
    errMsg.value = null
  }

  /**
   * 确保所有 APP 数据已经获取到或者正在获取中
   */
  function ensureData() {
    const newServer = getApiUrl()
    if ((server !== newServer || data.value === null) && !loading.value) {
      if (server !== newServer) {
        clearData()
      }
      fetchData()
    }
  }

  /**
   * 当服务器链接变化时，自动刷新
   *
   * 需要在组件的 `setup` 内调用。
   */
  function autoRefresh() {
    // 不能在 store 里面调用 `useServerSetting`，否则路由切换会丢失响应式。也不能注册监听事件，避免不必要的性能损耗。
    const serverRef = useServerSetting()
    let activated = false
    watch(serverRef, () => {
      if (activated) fetchData()
    })
    onActivated(() => {
      if (serverRef.value != server) fetchData()
      activated = true
    })
    onDeactivated(() => {
      activated = false
    })
  }

  return { loading, data, errMsg, fetchData, ensureData, clearData, autoRefresh }
})
