import type { HomeResponseData } from '@/data/home'
import { useMultiSourceData, type Source } from '@/utils/data'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useMetadataSourceStore } from './metadataSource'

const TAG = '[HomeStore]'

export interface Announcement {
  sourceName: string
  content: string
  key: string
  timestamp: number
}

interface HomeSource extends Source<HomeResponseData> {
  name: string
}

/**
 * 首页数据
 */
export const useHomeStore = defineStore('home', () => {
  const metadataSourceStore = useMetadataSourceStore()

  const {
    isLoaded,
    isLoading,
    stateArray,
    errorArray,
    hasErrors,
    load: loadData,
  } = useMultiSourceData<HomeSource, HomeResponseData, Error>(
    computed(() =>
      metadataSourceStore.enabledSourceArray.map((source) => ({
        name: source.name,
        key: source.key,
        load: () => source.fetchHome(),
      })),
    ),
  )
  const announcements = computed<Announcement[]>(() =>
    stateArray
      .filter((item) => item.data?.showAnnouncement && Boolean(item.data.announcement))
      .map<Announcement>((item) => ({
        sourceName: item.source.name,
        content: item.data!.announcement!,
        key: item.source.key,
        timestamp: item.timestamp,
      })),
  )
  const hasAnnouncements = computed(() => announcements.value.length > 0)

  function ensureData() {
    if (isLoaded.value || isLoading.value) {
      return
    }
    loadData()
  }

  return { isLoading, isLoaded, errorArray, hasErrors, announcements, hasAnnouncements, ensureData, loadData ,stateArray}
})
