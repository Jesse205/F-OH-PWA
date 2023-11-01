// Utilities
import { URL_API_ALL_APP_LIST } from '@/data/constants'
import { AppInfo } from '@/ts/interfaces/app.interfaces'
import { autoFetchJson } from '@/util/fetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppsStore = defineStore('apps', () => {
  const loading = ref(false)
  const data = ref<AppInfo[] | null>(null)
  const errMsg = ref<string | null>(null)

  /**
   * 获取所有 APP 数据
   */
  function fetchData() {
    loading.value = true
    errMsg.value = null
    autoFetchJson<AppInfo[]>(URL_API_ALL_APP_LIST)
      .then((newData) => {
        data.value = newData
        console.log('fetched apps', newData)
        errMsg.value = null
      })
      .catch((reason) => {
        console.error("Can't load data:", reason)
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
    if (data.value == null && !loading.value) {
      fetchData()
    }
  }

  return { loading, data, errMsg, fetchData, ensureData }
})
