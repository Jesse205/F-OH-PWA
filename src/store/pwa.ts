import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePwaStore = defineStore('pwa', () => {
  const installBtnVisible = ref(false)

  const promptEvent = ref<BeforeInstallPromptEvent>()
  /**
   * 当点击“安装”时的事件
   */
  function onInstallBtnClick() {
    if (promptEvent.value === undefined) return
    installBtnVisible.value = false
    promptEvent.value.prompt()
    promptEvent.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
        installBtnVisible.value = false
      } else {
        console.log('User dismissed the A2HS prompt')
        installBtnVisible.value = true
      }
    })
  }
  return { installBtnVisible, onInstallBtnClick, promptEvent }
})
