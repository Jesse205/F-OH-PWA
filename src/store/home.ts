// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { HomeData } from '@/ts/interfaces/home.interfaces'
import { autoFetchJson } from '@/util/fetch'
import { URL_API_HOME } from '@/data/constants'

export const useHomeStore = defineStore('home', () => {
  const loading = ref(false)
  const data = ref<HomeData | null>(null)
  const errMsg = ref<string | null>(null)


  /**
   * 获取主页数据
   */
  function fetchData() {
    loading.value = true
    errMsg.value = null
    autoFetchJson<HomeData>(URL_API_HOME)
      .then((newData) => {
        data.value = newData
        console.log('fetched home data', newData)
        errMsg.value = null
      })
      .catch((reason) => {
        console.error("Can't load home data:", reason)
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
