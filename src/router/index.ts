import { IS_DEV_MODE } from '@/constants'
import { isWebHistorySupported } from '@/util/app'
import type { HistoryState, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const SELECTOR_SCROLL = '.main-container .main-scroll'
export const PATH_HOME = '/index/home'
const TAG = '[Router]'

interface ScrollToOptions2 {
  [path: string]: ScrollToOptions
}

declare module 'vue-router' {
  export interface HistoryState {
    forward?: string
    back?: string
    current?: string
    scroll?: ScrollToOptions
    // 基于单个元素和路径的滚动配置
    scroll2?: ScrollToOptions2
    [key: string]: any
  }
}

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    path: '/index',
    component: async () => await import('@/views/MainView/MainView.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: async () => await import('@/views/MainView/MainHomeView.vue'),
      },
      {
        path: 'categories',
        name: 'Categories',
        component: async () => await import('@/views/MainView/MainCategoriesView.vue'),
      },
      {
        path: 'update',
        name: 'Update',
        component: async () => await import('@/views/MainView/MainUpdateView.vue'),
      },
      {
        path: 'me',
        name: 'Me',
        component: async () => await import('@/views/MainView/MainMeView.vue'),
      },
      {
        path: ':chapters*',
        redirect: { name: 'Home' },
      },
    ],
  },
  {
    path: '/app/:pkg',
    name: 'App',
    component: async () => await import('@/views/AppView/AppView.vue'),
  },
  {
    path: '/manager',
    name: 'Manager',
    component: async () => await import('@/views/ManagerView/ManagerView.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: async () => await import('@/views/SettingsView/SettingsView.vue'),
  },
  {
    path: '/donate',
    name: 'Donate',
    component: async () => await import('@/views/DonateView/DonateView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: async () => await import('@/views/AboutView/AboutView.vue'),
  },
  {
    path: '/:chapters*',
    redirect: { name: 'Home' },
  },
]

const history = isWebHistorySupported()
  ? createWebHistory(import.meta.env.BASE_URL)
  : createWebHashHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes,
  /**
   * 本方法直接设置滚动位置，并没有按照常规逻辑返回位置信息。
   */
  scrollBehavior(to, from, savedPosition) {
    if (IS_DEV_MODE) console.debug(TAG, 'scrollBehavior', to, from, savedPosition)
    const state: HistoryState = window.history.state

    if (state.scroll2 && state.current) {
      // 有动画，所以要选择第最后一个元素
      if (state.scroll2 && state.current) {
        const element = document.querySelector(`.page[data-path='${to.path}']:last-child ${SELECTOR_SCROLL}`)
        element?.scrollTo(state.scroll2[state.current])
      }
    }
  },
})

const scrollState2: ScrollToOptions2 = (history.state.scroll2 as ScrollToOptions2) ?? {}

router.beforeEach((to, from) => {
  if (IS_DEV_MODE) console.debug(TAG, 'beforeEach', to, from)

  // 用户在主页点击首页时自动返回，防止有重复的历史记录。
  if (to.path === PATH_HOME && to.path === history.state.back) {
    history.go(-1)
    console.warn(TAG, `Backing to '${to.path}' because history.state.back='${history.state.back}'. state may lost!`)
    return false
  }
  // TODO: 使用更好的方法实现
  const state = {
    ...history.state,
    scroll2: scrollState2,
  }
  // 当前有一个bug，通过导航按钮切换的页面无法监听,因为current可能不等于from。这可能导致滚动状态无法被保存。此处使用内存泄漏掩盖部分bug
  const scrollElement = document.querySelector(SELECTOR_SCROLL)
  const scrollData = {
    top: scrollElement?.scrollTop ?? 0,
    left: scrollElement?.scrollLeft ?? 0,
  }
  scrollState2[from.fullPath] = scrollData
  if (IS_DEV_MODE) {
    console.debug(`${TAG} Saving scrollData:`, scrollData)
    console.debug(`${TAG} Saving state`, state)
  }
  if (history.state.current !== from.fullPath) {
    console.warn(
      TAG,
      `history.state.current ('${history.state.current}') !== from.fullPath ('${from.fullPath}'), state maybe not to be saved!`,
    )
  }
  window.history.replaceState(state, document.title)
  return true
})

router.afterEach((to, from) => {
  if (IS_DEV_MODE) console.debug(TAG, 'afterEach', to, from)

  // 动画
  if (from.path !== '/') {
    // const name = history.state.forward ? 'scroll-x-transition' : 'scroll-x-reverse-transition'
    const name = history.state.forward ? 'page-transition' : 'page-reverse-transition'
    to.meta.transition = name
    from.meta.transition = name
  } else {
    to.meta.transition = ''
    from.meta.transition = ''
  }
})

export default router
