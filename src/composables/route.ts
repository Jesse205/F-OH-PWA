import { homeRouteData } from '@/data/home'
import { PATH_HOME } from '@/router'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
  const isBackHistoryNotHomeAndUndefined = computed<boolean>(() => {
    route.path // 确保路由刷新时重新调用该函数
    const { back: backFullPath } = router.options.history.state
    const backPath = backFullPath && new URL(backFullPath, location.href).pathname
    if (!backPath) return false
    return backPath !== PATH_HOME
  })

  const routeButtonReplace = computed(() => {
    return isInMainView.value && (activePagePosition.value !== 0 || isBackHistoryNotHomeAndUndefined.value)
  })
  return { activePagePosition, isInMainView, isBackHistoryNotHomeAndUndefined, routeButtonReplace }
}
