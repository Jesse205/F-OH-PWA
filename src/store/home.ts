import { PATH_API_HOME } from '@/constants/urls'
import type { HomeResponseData } from '@/data/home'
import { apiAxios } from '@/utils/http'
import { getShowdownConverter } from '@/utils/markdown'
import { useAxios } from '@vueuse/integrations/useAxios.mjs'
import { defineStore } from 'pinia'
import { computed } from 'vue'

const TAG = '[HomeStore]'

/**
 * 首页数据
 */
export const useHomeStore = defineStore('home', () => {
  const { data, isFinished, isLoading, error, execute } = useAxios<HomeResponseData>(PATH_API_HOME, apiAxios)
  const isLoaded = computed(() => data.value !== undefined)
  const isShowAnnouncement = computed(() => data.value?.showAnnouncement ?? false)
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

  function refreshData() {
    execute()
  }
  function ensureData() {
    if (isLoaded.value || isLoading.value) return
    execute()
  }

  return { data, isFinished, isLoading, isLoaded, error, isShowAnnouncement, announcementHtml, ensureData, refreshData }
})
