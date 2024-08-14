import { BASE_URL, IS_DEV_MODE } from '@/constants'
import { currentDesignConfig } from '@/themes'
import { isWebHistorySupported } from '@/utils/global'
import { isPageTransitionEnabled } from '@/utils/settings'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const TAG = '[Router]'

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
    path: '/licenses',
    name: 'Licenses',
    component: async () => await import('@/pages/licenses/LicensesView.vue'),
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
  if (IS_DEV_MODE) {
    console.log(TAG, 'beforeEach', to, from)
  }
  if (!to.query.apiUrl && from.query.apiUrl) {
    to.query.apiUrl = from.query.apiUrl
    return to
  }
})

// 当前页面索引，用于判断路由切换时是前进还是后退
let previousPosition = 0
router.afterEach((to, from) => {
  if (IS_DEV_MODE) {
    console.debug(TAG, 'afterEach', to, from)
  }
  const currentPosition = history.state.position
  const isForward = currentPosition >= previousPosition
  if (IS_DEV_MODE) {
    console.debug(TAG, `currentPosition=${currentPosition}, previousPosition=${previousPosition}`)
  }
  previousPosition = currentPosition ?? 0

  // 动画
  if (from.path !== '/' && currentDesignConfig.features.pageTransition && isPageTransitionEnabled()) {
    const { enter: enterName, leave: leaveName } = currentDesignConfig.features.pageTransition
    const name = isForward ? enterName : leaveName
    to.meta.transition = name
    from.meta.transition = name
  } else {
    to.meta.transition = ''
    from.meta.transition = ''
  }
})

export default router
