// Composables
import { nextTick } from 'vue'
import { HistoryState, createRouter, createWebHashHistory } from 'vue-router'

const EL_SCROLL = '.v-main .mainScroll'

declare module 'vue-router' {
  interface RouteMeta {
    transition?: string
    savedPosition: ScrollToOptions
  }
  interface HistoryState {
    forward: string | null
    back: string | null
    current: string | null
    scroll: ScrollToOptions
    //基于单个元素和路径的滚动配置
    scroll2: {
      [index: string]: ScrollToOptions
    } | null
    [index: string]: ScrollToOptions
  }
}

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('@/views/MainView/MainView.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/MainView/MainHomeView.vue')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/MainView/MainCategoriesView.vue')
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/views/MainView/MainUpdateView.vue')
      },
      {
        path: 'me',
        name: 'Me',
        component: () => import('@/views/MainView/MainMeView.vue')
      },
      {
        path: ':chapters*',
        redirect: { name: 'Home' }
      }
    ]
  },
  {
    path: '/app/:id',
    name: 'App',
    component: () => import('@/views/AppView/AppView.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('@/views/UploadView/UploadView.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView/SettingsView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView/AboutView.vue')
  },
  {
    path: '/:chapters*',
    redirect: { name: 'Home' }
  }
]

const history = createWebHashHistory(process.env.BASE_URL)
const router = createRouter({
  history,
  routes
})

router.beforeEach((to, from) => {
  // TODO: 使用更好的方法实现
  const state = {
    ...history.state,
    scroll2: history.state.scroll2 ?? {}
  } as HistoryState
  // 当前有一个bug，通过导航按钮切换的页面无法监听,因为current可能不等于from
  if (history.state.current === from.fullPath) {
    state.scroll2![from.fullPath] = {
      top: document.querySelector(EL_SCROLL)?.scrollTop || 0,
      left: document.querySelector(EL_SCROLL)?.scrollLeft || 0
    }
    console.log('saving state', state)
  } else {
    console.log('history.state.current !== from.fullPath, cannot save state.')
  }
  window.history.replaceState(state, document.title)
  return true
})

router.afterEach((to, from) => {
  if (from.path !== '/') {
    const name = history.state.forward ? 'scroll-x-transition' : 'scroll-x-reverse-transition'
    to.meta.transition = name
    from.meta.transition = name
  } else {
    const name = 'fade-transition'
    to.meta.transition = name
    from.meta.transition = name
  }

  nextTick(() => {
    //有动画，所以要选择第最后一个元素
    const state = window.history.state as HistoryState
    if (state.scroll2 && state.current) {
      const elements = document.querySelectorAll(EL_SCROLL)
      elements[elements.length - 1]?.scrollTo(state.scroll2[state.current])
    }
  })
})

export default router
