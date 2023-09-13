import { MaybeRef, Ref, onActivated, onDeactivated, ref, toRef, unref, watch, watchEffect } from 'vue'
import { useHomeStore } from '@/store/home'
import { useI18n } from 'vue-i18n'

export function useTitle(title: string | Ref, actived: Ref<boolean> = ref(true)) {
  const { t } = useI18n()
  const wrappedTitle = toRef(title)
  onActivated(() => (actived.value = true))
  onDeactivated(() => (actived.value = false))
  watchEffect(() => {
    if (actived.value) {
      document.title = `${wrappedTitle.value} - ${t('appName')}`
    }
  })
}

export function useHomeTitle(title: MaybeRef<string>, actived: Ref<boolean> = ref(true)) {
  const wrappedTitle = toRef(title)
  const homeStore = useHomeStore()
  useTitle(title)
  onActivated(() => (actived.value = true))
  onDeactivated(() => (actived.value = false))
  watchEffect(() => {
    if (actived.value) {
      homeStore.fragmentTitle = wrappedTitle.value
    }
  })
}
