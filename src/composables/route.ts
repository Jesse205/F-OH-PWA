import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { PATH_MAIN } from '@/constants/urls'
import { homeRouteData } from '@/data/home'

export const INDEX_NOT_FOUND = -1

export function useHomeRoutes() {
  const route = useRoute()
  const router = useRouter()

  const activePagePosition = computed(() => {
    return route.name ? homeRouteData.findIndex((page) => page.name === route.name) : INDEX_NOT_FOUND
  })

  /**
   * 当前处于在主页内
   */
  const isInMainView = computed(() => activePagePosition.value !== INDEX_NOT_FOUND)

  /**
   * 返回链接不为首页
   */
  const isBackHistoryMain = computed<boolean>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    route.path // 确保路由刷新时重新调用该函数
    const { back: backFullPath } = router.options.history.state
    const backPath = backFullPath && new URL(backFullPath, location.href).pathname
    return backPath?.startsWith(PATH_MAIN) ?? false
  })

  const routeButtonReplace = computed(() => {
    return isInMainView.value && isBackHistoryMain.value
  })
  return { activePagePosition, isInMainView, isBackHistoryMain, routeButtonReplace }
}
