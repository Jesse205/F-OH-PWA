// Utilities
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { HomeData } from '@/ts/interfaces/home.interfaces'
import { getAxiosInstance } from '@/util/fetch'
import { IS_DEV_MODE, URL_API_HOME } from '@/data/constants'
import showdown from 'showdown'
import { assert } from '@/util/app'

const TAG = '[HomeStore]'

function newShowdownConverter() {
  const classMap: { [key: string]: string } = {
    h1: 'text-h6',
    h2: 'text-h6',
    h3: 'text-h6',
    h4: 'text-h6',
    h5: 'text-h6',
    h6: 'text-h6',
  }
  const bindings = Object.keys(classMap).map<showdown.ShowdownExtension>((key) => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`,
  }))
  const converter = new showdown.Converter({
    extensions: [...bindings],
  })
  converter.setOption('noHeaderId', true)
  converter.setOption('simplifiedAutoLink', true)
  converter.setOption('strikethrough', true)
  converter.setOption('tables', true)
  converter.setOption('ghCodeBlocks', true)
  converter.setOption('tasklists', true)
  converter.setOption('emoji', true)
  converter.setOption('underline', true)
  converter.setOption('ellipsis', true)
  converter.setOption('moreStyling', true)
  return converter
}

/**
 * 首页数据
 */
export const useHomeStore = defineStore('home', () => {
  const loading = ref(false)
  const data = ref<HomeData | null>(null)
  const errMsg = ref<string | null>(null)
  const announcementHtml = ref<string>()
  const converter = newShowdownConverter()

  /**
   * 拉取主页数据
   */
  function fetchData() {
    if (loading.value) return
    loading.value = true
    errMsg.value = null
    getAxiosInstance()
      .get<HomeData>(URL_API_HOME)
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

  watch(data, (newData) => {
    if (!newData?.announcement) return
    // 原来的文字不是markdown样式，所以应该转为markdown样式。
    let markdown = newData.announcement.replaceAll(/@(.+)/g, '#### $1')
    // 替换日期
    markdown = markdown.replaceAll(/(\d{4}-\d{2}-\d{2})/g, '`$1`')
    // 替换版本
    markdown = markdown.replaceAll(/\b(v[.\d]+)\b/g, '`$1`')
    announcementHtml.value = converter.makeHtml(markdown)
  })

  /**
   * 确保所有 APP 数据已经获取到或者正在获取中
   */
  function ensureData() {
    if (data.value === null && !loading.value) {
      fetchData()
    }
  }

  return { loading, data, errMsg, announcementHtml, fetchData, ensureData }
})
