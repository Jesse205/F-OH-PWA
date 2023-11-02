// Utilities
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { HomeData } from '@/ts/interfaces/home.interfaces'
import { autoFetchJson } from '@/util/fetch'
import { URL_API_HOME } from '@/data/constants'
import showdown from 'showdown'

function newShowdownConverter() {
  const classMap = <{ [key: string]: string }>{
    h1: 'text-h6',
    h2: 'text-h6',
    h3: 'text-h6',
    h4: 'text-h6',
    h5: 'text-h6',
    h6: 'text-h6'
  }
  const bindings = Object.keys(classMap).map<showdown.ShowdownExtension>((key) => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
  }))
  const converter = new showdown.Converter({
    extensions: [...bindings]
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

export const useHomeStore = defineStore('home', () => {
  const loading = ref(false)
  const data = ref<HomeData | null>(null)
  const errMsg = ref<string | null>(null)
  const announcementHtml = ref<string>()
  const converter = newShowdownConverter()

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
    if (data.value == null && !loading.value) {
      fetchData()
    }
  }

  return { loading, data, errMsg, announcementHtml, fetchData, ensureData }
})
