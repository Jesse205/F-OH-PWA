import { onBeforeUnmount, onMounted, ref, provide } from "vue"

interface BeforeInstallPrompt extends Event {
  prompt: () => void
  userChoice: Promise<any>
}

export function usePwa() {
  const installBtnVisible = ref(false)
  let deferredPrompt: BeforeInstallPrompt | null = null
  function onInstallBtnClick() {
    if (!deferredPrompt)
      return
    installBtnVisible.value = false
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log("User accepted the A2HS prompt");
        installBtnVisible.value = false
      } else {
        console.log("User dismissed the A2HS prompt");
        installBtnVisible.value = true
      }
    })
  }
  provide('installBtnVisible', installBtnVisible)
  provide('onInstallBtnClick', onInstallBtnClick)

  function onBeforeInstallPrompt(prompt: BeforeInstallPrompt) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    prompt.preventDefault()
    installBtnVisible.value = true
    deferredPrompt = prompt
  }

  onMounted(() => {
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt as () => Event)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt as () => Event)
  })
}
