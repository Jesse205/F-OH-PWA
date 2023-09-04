// Utilities
import { URL_ALL_APP_LIST } from '@/data/constants'
import { AppInfo } from '@/ts/interfaces/app.interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const data = ref<AppInfo[] | null>(null)
  const errMsg = ref<string | null>(null)

  /**
   * 获取所有 APP 数据
   */
  function fetchData() {
    loading.value = true
    errMsg.value = null
    fetch(URL_ALL_APP_LIST)
      .then(response => response.json())
      .then(newData => {
        data.value = newData
        console.log('fetched apps', newData)
      })
      .catch((reason) => {
        console.error('Can\'t load data:', reason)
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
    if (!data.value && !loading.value) {
      fetchData()
    }
  }

  return { loading, data, errMsg, fetchData, ensureData }
})
