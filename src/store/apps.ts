// Utilities
import { URL_ALL_APP_LIST } from '@/data/constants'
import { AppInfo } from '@/ts/interfaces/app.interfaces'
import { isTauri } from '@/util/app'
import { http } from '@tauri-apps/api'
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
    console.log('isTauri', isTauri())

    if (isTauri()) {
      http.fetch(URL_ALL_APP_LIST)
        .then(response => {
          if (response.ok) {
            data.value = response.data as AppInfo[]
            console.log('fetched apps', response.data)
          }
        })
        .catch((reason) => {
          console.error('Can\'t load data:', reason)
          errMsg.value = reason.toString()
        })
        .finally(() => {
          loading.value = false
        })
    } else {
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
