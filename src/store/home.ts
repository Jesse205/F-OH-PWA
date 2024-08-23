import { clearArray } from '@/utils/array'
import { renderAnnouncement } from '@/utils/markdown'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useMetadataSourceStore } from './metadataSource'

const TAG = '[HomeStore]'

interface Announcement {
  sourceName: string
  content: string
  contentHtml: string
}

interface HomeData {
  sourceName: string
  announcement?: string
  showAnnouncement: boolean
}

/**
 * 首页数据
 */
export const useHomeStore = defineStore('home', () => {
  const metadataSourceStore = useMetadataSourceStore()

  const isLoading = ref(false)
  const isLoaded = ref(false)
  const dataArray = reactive<HomeData[]>([])

  const errorArray = reactive<Error[]>([])
  const hasErrors = computed(() => errorArray.length > 0)

  const announcements = computed<Announcement[]>(() =>
    dataArray
      .filter((item: HomeData) => item.showAnnouncement && Boolean(item.announcement))
      .map((item: HomeData) => ({
        sourceName: item.sourceName,
        content: item.announcement!,
        contentHtml: renderAnnouncement(item.announcement!),
      })),
  )
  const hasAnnouncements = computed(() => announcements.value.length > 0)

  async function loadDataOnline() {
    // 仅当有数据加载时清空先前数据
    let clearedPreviousApps = false
    const promises = metadataSourceStore.enabledSourceArray.map((source) =>
      source
        .fetchHome()
        .then(async (data) => {
          if (!clearedPreviousApps) {
            clearArray(dataArray)
            clearedPreviousApps = true
          }
          dataArray.push({
            showAnnouncement: data.showAnnouncement,
            sourceName: source.name,
            announcement: data.announcement,
          })
        })
        .catch((reason) => {
          errorArray.push(reason)
          console.log(`${TAG} ${source.key} fetchHome error:`, reason)
        }),
    )

    const result = await Promise.allSettled(promises)
    const isAllRejected = result.every((result) => result.status === 'rejected')
    if (!clearedPreviousApps && !isAllRejected) {
      clearArray(dataArray)
      clearedPreviousApps = true
    }
  }

  async function loadData() {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    clearArray(errorArray)
    await loadDataOnline()
    isLoading.value = false
    isLoaded.value = true
  }

  function ensureData() {
    if (isLoaded.value || isLoading.value) {
      return
    }
    loadData()
  }

  return { isLoading, isLoaded, errorArray, hasErrors, announcements, hasAnnouncements, ensureData, loadData }
})
