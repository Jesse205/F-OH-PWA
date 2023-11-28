import type { MaybeRef} from 'vue';
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

interface NavPage {
  title: MaybeRef<string>
  icon: string
  activeIcon: string
  name: string
  disabled?: boolean
}

export function useHomeNavigation() {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const pages = computed<NavPage[]>(() => {
    return [
      {
        title: t('home.name'),
        icon: 'mdi-home-variant-outline',
        activeIcon: 'mdi-home-variant',
        name: 'Home',
      },
      {
        title: t('category.name', 2),
        icon: 'mdi-apps',
        activeIcon: 'mdi-apps',
        name: 'Categories',
      },
      {
        title: t('update.name'),
        icon: 'mdi-update',
        activeIcon: 'mdi-update',
        name: 'Update',
        disabled: true,
      },
      {
        title: t('me.name'),
        icon: 'mdi-account-outline',
        activeIcon: 'mdi-account',
        name: 'Me',
      },
    ]
  })
  const activePagePosition = computed(() =>
    route.name ? pages.value.findIndex((page) => page.name === route.name) : null,
  )

  const isInMainView = computed(() => activePagePosition.value !== -1)

  const isBackOtherPage = computed<boolean>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    route.path // 确保路由刷新时重新调用该函数
    return !!(router.options.history.state.back && router.options.history.state.back !== '/index/home')
  })
  return { pages, activePagePosition, isInMainView, isBackOtherPage }
}
