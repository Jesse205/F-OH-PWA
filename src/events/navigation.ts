import { MaybeRef, computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface NavPage {
  title: MaybeRef<string>
  icon: string
  activeIcon: string
  name: string
  disabled?: boolean
}

export function useHomeNavigation() {
  const { t } = useI18n()

  const pages = computed<NavPage[]>(() => {
    return [
      {
        title: t('home.name'),
        icon: 'mdi-home-variant-outline',
        activeIcon: 'mdi-home-variant',
        name: 'Home'
      },
      {
        title: t('category.name', 2),
        icon: 'mdi-apps',
        activeIcon: 'mdi-apps',
        name: 'Categories'
      },
      {
        title: t('update.name'),
        icon: 'mdi-update',
        activeIcon: 'mdi-update',
        name: 'Update',
        disabled: true
      },
      {
        title: t('me.name'),
        icon: 'mdi-account-outline',
        activeIcon: 'mdi-account',
        name: 'Me'
      }
    ]
  })
  return { pages }
}
