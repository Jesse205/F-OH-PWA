import { BASE_URL, IS_DEV_MODE } from '@/constants'
import { isWebHistorySupported } from '@/utils/app'
import { isPageTransitionEnabled } from '@/utils/settings'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

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
  }
}

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    path: '/main',
    component: async () => await import('@/pages/main/MainView.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: async () => await import('@/pages/main/MainHomeView.vue'),
      },
      {
        path: 'categories',
        name: 'Categories',
        component: async () => await import('@/pages/main/MainCategoriesView.vue'),
      },
      {
        path: 'update',
        name: 'Update',
        component: async () => await import('@/pages/main/MainUpdateView.vue'),
      },
      {
        path: 'me',
        name: 'Me',
        component: async () => await import('@/pages/main/MainMeView.vue'),
      },
      {
        path: ':chapters*',
        redirect: { name: 'Home' },
      },
    ],
  },
  // 重定向旧版链接
  {
    path: '/index',
    children: [
      {
        path: 'home',
        redirect: { name: 'Home' },
      },
      {
        path: 'categories',
        redirect: { name: 'Categories' },
      },
      {
        path: 'update',
        redirect: { name: 'Update' },
      },
      {
        path: 'me',
        redirect: { name: 'Me' },
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
    component: async () => await import('@/pages/app/AppView.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: async () => await import('@/pages/settings/SettingsView.vue'),
  },
  {
    path: '/donate',
    name: 'Donate',
    component: async () => await import('@/pages/donate/DonateView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: async () => await import('@/pages/about/AboutView.vue'),
  },
  {
    path: '/:chapters*',
    redirect: { name: 'Home' },
  },
]

const history = isWebHistorySupported() ? createWebHistory(BASE_URL) : createWebHashHistory(BASE_URL)

const router = createRouter({
  history,
  routes,
})

router.beforeEach((to, from) => {
  if (!to.query.apiUrl && from.query.apiUrl) {
    to.query.apiUrl = from.query.apiUrl
    return to
  }
})

router.afterEach((to, from) => {
  if (IS_DEV_MODE) {
    console.debug(TAG, 'afterEach', to, from)
  }

  // 动画
  if (from.path !== '/' && isPageTransitionEnabled()) {
    // const name = history.state.forward ? 'scroll-x-transition' : 'scroll-x-reverse-transition'
    // const name = history.state.forward ? 'page-leave-transition' : 'page-enter-transition'
    const name = history.state.forward ? 'page-leave-animation' : 'page-enter-animation'
    to.meta.transition = name
    from.meta.transition = name

  } else {
    to.meta.transition = ''
    from.meta.transition = ''
  }
})

export default router
