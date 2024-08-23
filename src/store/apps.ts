import { fetchLocalApps, type AppInfo } from '@/data/apps'
import { clearArray } from '@/utils/array'
import { defineStore } from 'pinia'
import { computed, reactive, ref, shallowReactive, watch } from 'vue'
import { useMetadataSourceStore } from './metadataSource'
const TAG = '[AppsStore]'

/**
 * 应用市场所有应用数据
 */
export const useAppsStore = defineStore('apps', () => {
  const metadataSourceStore = useMetadataSourceStore()

  const apps = shallowReactive<AppInfo[]>([])
  const normalApps = shallowReactive<AppInfo[]>([])
  const gameApps = shallowReactive<AppInfo[]>([])
  const othersApps = shallowReactive<AppInfo[]>([])
  const hasApps = computed(() => apps.length > 0)

  //分类apps
  watch(apps, (newApps) => {
    clearArray(normalApps)
    clearArray(gameApps)
    clearArray(othersApps)
    newApps.forEach((app) => {
      if (app.type === 'app') {
        normalApps.push(app)
      } else if (app.type === 'game') {
        gameApps.push(app)
      } else {
        othersApps.push(app)
      }
    })
  })

  const isLoading = ref(false)
  const isLoaded = ref(false)
  const errorArray = reactive<Error[]>([])
  const hasErrors = computed(() => errorArray.length > 0)

  async function loadAppsLocally() {
    const newData = await fetchLocalApps()
    clearArray(apps)
    apps.push(...newData)
  }

  async function loadAppsOnline() {
    // 仅当有数据加载时清空先前数据
    let clearedPreviousApps = false
    const promises = metadataSourceStore.enabledSourceArray.map((source) =>
      source
        .fetchApps()
        .then(async (newApps) => {
          if (newApps.length === 0) {
            return
          }
          if (!clearedPreviousApps) {
            clearArray(apps)
            clearedPreviousApps = true
          }
          apps.push(...newApps)
        })
        .catch((reason) => {
          errorArray.push(reason)
          console.error(`${TAG} ${source.key} fetchApps error:`, reason)
          throw reason
        }),
    )
    // 全部加载失败时不删除原数据
    const result = await Promise.allSettled(promises)
    const isAllRejected = result.every((result) => result.status === 'rejected')
    if (!clearedPreviousApps && !isAllRejected) {
      clearArray(apps)
      clearedPreviousApps = true
    }
  }

  /**
   * 加载数据，如果本地数据不为空、不过期，则使用本地数据
   * @param forceFromOnline 强制从网络中加载，如果为true，则无论本地是否有缓存，都会强制从网络中加载
   */
  async function loadData(forceFromOnline = false) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    clearArray(errorArray)
    let fromOnline = forceFromOnline
    if (!fromOnline) {
      await loadAppsLocally()
      fromOnline = apps.length === 0
    }
    if (forceFromOnline || fromOnline) {
      await loadAppsOnline()
    }
    isLoading.value = false
    isLoaded.value = true
  }

  function ensureData() {
    if (isLoaded.value || isLoading.value) {
      return
    }
    loadData()
  }

  return {
    apps,
    normalApps,
    gameApps,
    othersApps,
    hasApps,
    isLoading,
    isLoaded,
    errorArray,
    hasErrors,
    loadData,
    ensureData,
  }
})
