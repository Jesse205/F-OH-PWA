import { usePreferredApiUrl } from '@/composables/settings'
import { IS_DEV_MODE } from '@/constants'
import type { HomeData } from '@/data/home'
import { assert } from '@/utils/app'
import { getAxiosInstance } from '@/utils/http'
import { getShowdownConverter } from '@/utils/markdown'
import { getApiUrl, getHomeApiUrl } from '@/utils/url'
import { defineStore } from 'pinia'
import { computed, onActivated, onDeactivated, ref, watch } from 'vue'

const TAG = '[HomeStore]'

/**
 * 首页数据
 */
export const useHomeStore = defineStore('home', () => {
  const loading = ref(false)
  const data = ref<HomeData | null>(null)
  const errMsg = ref<string | null>(null)
  const converter = getShowdownConverter()
  const announcementHtml = computed(() => {
    if (!data.value?.announcement) return undefined
    // 原来的文字不是markdown样式，所以应该转为markdown样式。
    let markdown = data.value.announcement.replaceAll(/@(.+)/g, '#### $1')
    // 替换日期
    markdown = markdown.replaceAll(/(\d{4}-\d{2}-\d{2})/g, '`$1`')
    // 替换版本
    markdown = markdown.replaceAll(/\b(v[.\d]+)\b/g, '`$1`')
    return converter.makeHtml(markdown)
  })
  // 用于判断数据是否过时
  let server: string | undefined

  /**
   * 拉取主页数据
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
      .get<HomeData>(getHomeApiUrl())
      .then((response) => {
        assert(typeof response.data === 'object', "Data isn't object.")
        if (IS_DEV_MODE) console.debug(TAG, 'fetched home data', response.data)
        data.value = response.data
        errMsg.value = null
      })
      .catch((reason) => {
        if (IS_DEV_MODE) console.error(TAG, "Can't load home data:", reason)
        errMsg.value = reason.toString()
      })
      .finally(() => {
        loading.value = false
      })
  }

  /**
   * 清空数据 `data` 与 `errMsg`
   */
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
      fetchData()
    }
  }

  /**
   * 当服务器链接变化时，自动刷新。
   *
   * 需要在组件的 `setup` 内调用。
   */
  function autoRefresh() {
    // 不能在 store 里面调用 `useServerSetting`，否则路由切换**会丢失响应式**。也不能注册监听事件，避免不必要的性能损耗。
    const serverRef = usePreferredApiUrl()
    let activated = false
    watch(serverRef, () => {
      if (serverRef.value !== server && activated) {
        fetchData()
      }
    })
    onActivated(() => {
      if (serverRef.value !== server) {
        fetchData()
      }
      activated = true
    })
    onDeactivated(() => {
      activated = false
    })
  }

  return { loading, data, errMsg, announcementHtml, fetchData, ensureData, clearData, autoRefresh }
})
