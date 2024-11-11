import type { RouteLocationNormalizedGeneric, Router, RouteRecordRaw, RouterHistory } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { BASE_URL, IS_DEV_MODE } from '@/constants'
import { isPageTransitionEnabled } from '@/preferences/ui'
import { currentDesignConfig } from '@/themes'
import { isWebHistorySupported } from '@/utils/global'

const TAG = '[Router]'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    path: '/main',
    component: () => import('@/pages/main/MainView.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/main/MainHomeView.vue'),
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/pages/main/MainCategoriesView.vue'),
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/pages/main/MainUpdateView.vue'),
      },
      {
        path: 'me',
        name: 'Me',
        component: () => import('@/pages/main/MainMeView.vue'),
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
    path: '/metadata-sources',
    name: 'MetadataSources',
    component: async () => await import('@/pages/metadata-sources/MetadataSourcesView.vue'),
  },
  {
    path: '/:chapters*',
    redirect: { name: 'Home' },
  },
]

const history: RouterHistory = isWebHistorySupported() ? createWebHistory(BASE_URL) : createWebHashHistory(BASE_URL)

const router: Router = createRouter({
  history,
  routes,
})



export default router
