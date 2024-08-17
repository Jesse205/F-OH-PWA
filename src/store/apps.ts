import { IS_DEV_MODE } from '@/constants'
import { fetchLocalApps, fetchOnlineApps, type AppInfo } from '@/data/apps'
import { getEnabledMetadataArray } from '@/data/metadata'
import { clearArray } from '@/utils/array'
import { defineStore } from 'pinia'
import { ref, shallowReactive, watch } from 'vue'
const TAG = '[AppsStore]'

/**
 * 应用市场所有应用数据
 */
export const useAppsStore = defineStore('apps', () => {
  const apps = shallowReactive<AppInfo[]>([])
  const normalApps = shallowReactive<AppInfo[]>([])
  const gameApps = shallowReactive<AppInfo[]>([])
  const othersApps = shallowReactive<AppInfo[]>([])
  watch(apps, (newApps) => {
    normalApps.splice(0, normalApps.length)
    gameApps.splice(0, gameApps.length)
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
  const error = ref()

  async function loadOnlineApps(array: AppInfo[] = apps) {
    let clearedPreviousApps = false
    const promises = getEnabledMetadataArray()
      .map((metadata) => fetchOnlineApps(metadata.api))
      .map((promise) =>
        promise.then(async (newApps) => {
          if (newApps.length === 0) {
            return
          }
          if (!clearedPreviousApps) {
            clearArray(array)
            clearedPreviousApps = true
          }
          array.push(...newApps)
        }),
      )

    await Promise.all(promises)
  }

  async function loadLocalApps(array: AppInfo[] = apps) {
    clearArray(array)
    array.push(...(await fetchLocalApps()))
  }

  async function loadData(forceFromOnline = false) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    try {
      let fromOnline = forceFromOnline
      if (!forceFromOnline) {
        const newApps: AppInfo[] = []
        await loadLocalApps(newApps)
        if (newApps.length === 0) {
          fromOnline = true
          if (IS_DEV_MODE) {
            console.log(TAG, '未从本地获取到任何数据，正在从网络获取数据')
          }
        } else {
          clearArray(apps)
          apps.push(...newApps)
        }
      }

      if (fromOnline) {
        await loadOnlineApps()
      }
      error.value = undefined
    } catch (e) {
      error.value = e
      console.error(e)
    }
    isLoading.value = false
    isLoaded.value = true
  }

  async function ensureData() {
    if (isLoaded.value || isLoading.value) {
      return
    }
    await loadData()
  }
  return { apps, normalApps, gameApps, othersApps, isLoading, isLoaded, error, loadData, ensureData }
})
