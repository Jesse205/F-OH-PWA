// Utilities
import { IS_DEV_MODE } from '@/data/constants'
import type { AppInfo } from '@/ts/interfaces/app.interfaces'
import { assert } from '@/util/app'
import { getAxiosInstance } from '@/util/fetch'
import { getAllAppsListApiUrl } from '@/util/url'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const TAG = '[AppsStore]'

/**
 * 应用市场所有应用数据
 */
export const useAppsStore = defineStore('apps', () => {
  const loading = ref(false)
  const data = ref<AppInfo[] | null>(null)
  const errMsg = ref<string | null>(null)

  /**
   * 获取所有 APP 数据
   */
  function fetchData() {
    if (loading.value) return
    loading.value = true
    errMsg.value = null
    getAxiosInstance()
      .get<AppInfo[]>(getAllAppsListApiUrl())
      .then((response) => {
        assert(typeof response.data === 'object', "Data isn't object.")
        if (IS_DEV_MODE) console.log(TAG, 'Fetched apps', response.data)
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

  /**
   * 确保所有 APP 数据已经获取到或者正在获取中
   */
  function ensureData() {
    if (data.value === null && !loading.value) {
      fetchData()
    }
  }

  return { loading, data, errMsg, fetchData, ensureData }
})
