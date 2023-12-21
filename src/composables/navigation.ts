import { splitPathAndHash } from '@/util/url'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

export interface NavPage {
  title: string
  icon: string
  activeIcon: string
  name: string
  disabled?: boolean
  refreshable?: boolean
}

export function useHomeNavigation() {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const pages = computed<NavPage[]>(() => {
    return [
      {
        title: t('home.name'),
        icon: '$home',
        activeIcon: '$homeFilled',
        name: 'Home',
        refreshable: true,
      },
      {
        title: t('category.name', 2),
        icon: '$apps',
        activeIcon: '$appsFilled',
        name: 'Categories',
        refreshable: true,
      },
      {
        title: t('update.name'),
        icon: '$update',
        activeIcon: '$updateFilled',
        name: 'Update',
        disabled: true,
      },
      {
        title: t('me.name'),
        icon: '$account',
        activeIcon: '$accountFilled',
        name: 'Me',
      },
    ]
  })
  const activePagePosition = computed(() =>
    route.name ? pages.value.findIndex((page) => page.name === route.name) : -1,
  )

  const isInMainView = computed(() => activePagePosition.value !== -1)

  const isBackOtherPage = computed<boolean>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    route.path // 确保路由刷新时重新调用该函数
    const { back } = router.options.history.state
    const pureBackUrl = typeof back === 'string' ? splitPathAndHash(back)[0] : undefined
    return Boolean(pureBackUrl && pureBackUrl !== '/index/home')
  })
  return { pages, activePagePosition, isInMainView, isBackOtherPage }
}
