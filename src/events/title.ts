import { MaybeRef, Ref, onActivated, onDeactivated, ref, toRef, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export function useTitle(title: MaybeRef<string | null>, actived: Ref<boolean> = ref(true)) {
  const { t } = useI18n()
  const wrappedTitle = toRef(title)
  onActivated(() => (actived.value = true))
  onDeactivated(() => (actived.value = false))
  watchEffect(() => {
    if (actived.value) {
      document.title = wrappedTitle.value ? `${wrappedTitle.value} - ${t('appName')}` : t('appName')
    }
  })
}
