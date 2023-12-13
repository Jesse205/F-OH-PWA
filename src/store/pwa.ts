import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePwaStore = defineStore('pwa', () => {
  const installBtnVisible = ref(false)
  const onInstallBtnClick = ref<() => void>()
  return { installBtnVisible, onInstallBtnClick }
})
