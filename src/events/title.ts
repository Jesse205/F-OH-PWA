import { Ref, onActivated, unref } from 'vue';
import { useHomeStore } from '@/store/home';
import { useI18n } from 'vue-i18n'

export function useTitle(title: string | Ref) {

  const { t } = useI18n()
  const unwrappedTitle = unref(title)
  onActivated(() => {
    document.title = `${unwrappedTitle} - ${t('appName')}`
  })
}

export function useHomeTitle(title: string | Ref) {
  const unwrappedTitle = unref(title)
  const homeStore = useHomeStore()
  useTitle(title)
  onActivated(() => {
    homeStore.fragmentTitle = unwrappedTitle
  })
}
