// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const EL_SCROLL = '.v-main .mainContent'

declare module 'vue-router' {
  interface RouteMeta {
    transition?: string
    savedPosition: ScrollToOptions
  }
}

declare module 'vue-router' {
  interface HistoryState {
    scroll: ScrollToOptions
  }
}

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import('@/views/MainView/MainView.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/MainView/MainHomeView.vue'),
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/MainView/MainCategoriesView.vue'),
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/views/MainView/MainUpdateView.vue'),
      },
      {
        path: 'me',
        name: 'Me',
        component: () => import('@/views/MainView/MainMeView.vue'),
      },
      {
        path: ':chapters*',
        redirect: { name: 'Home' }
      },
    ]
  },
  {
    path: '/app/:id',
    name: 'App',
    component: () => import('@/views/AppView/AppView.vue'),
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('@/views/UploadView/UploadView.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView/SettingsView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView/AboutView.vue'),
  },
  {
    path: '/:chapters*',
    redirect: { name: 'Home' }
  },
]

const history = createWebHashHistory(process.env.BASE_URL)
const router = createRouter({
  history,
  routes,
  //TODO: 实现页面切换保持位置不变
  /* scrollBehavior(to, from, savedPosition) {
    console.log('savedPosition', savedPosition);
    console.log(document.querySelectorAll('.v-main .mainContent')[1]);

    return {
      el: document.querySelectorAll('.v-main .mainContent')[1],
      top: history.state.forward ? savedPosition?.top : 0 || 0
    }
  }, */

})

/* router.beforeEach((to, from) => {
  if (history.state.scroll) {

    // history.state.scroll.top = document.querySelector(EL_SCROLL)?.scrollTop || 0
    console.log('scroll', history.state.scroll);
  }
  return true
}) */

router.afterEach((to, from) => {
  const name = history.state.forward ? 'scroll-x-transition' : 'scroll-x-reverse-transition'
  to.meta.transition = name
  from.meta.transition = name
})

export default router
