import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePwaStore = defineStore('pwa', () => {
  const installBtnVisible = ref(false)
  /**
   * 当点击“安装”时的事件
   */
  const onInstallBtnClick = ref<() => void>()
  return { installBtnVisible, onInstallBtnClick }
})
