import IMAGE_BANNER_2 from '@/assets/images/banners/banner2.webp'
import IMAGE_BANNER_3 from '@/assets/images/banners/banner3.webp'
import IMAGE_BANNER_FOH from '@/assets/images/banners/foh.webp'
import type { TranslateParameters } from '@/utils/i18n'

export interface HomeResponseData {
  announcement?: string
  showAnnouncement: boolean
}

export interface CarouselItem {
  src?: string
  alt: string
  image: string
}

/**
 * 首页横幅数据
 */
export interface Carousel {
  /**
   * 横幅数据
   */
  items: CarouselItem[]
  /**
   * 图片比例
   */
  ratio: number
}

export const carousel: Carousel = {
  items: [
    {
      image: IMAGE_BANNER_FOH,
      alt: 'F-OH',
    },
    {
      image: IMAGE_BANNER_2,
      alt: '',
    },
    {
      image: IMAGE_BANNER_3,
      alt: '',
    },
  ],
  ratio: 21 / 9,
}

export interface RouteItemData {
  title: TranslateParameters | string
  icon: string
  activeIcon: string
  name: string
  disabled?: boolean
  refreshable?: boolean
}

export interface HomeRouteItemData extends RouteItemData {
  refreshable?: boolean
}

export const homeRouteData: HomeRouteItemData[] = [
  {
    title: '$t.home',
    icon: '$navigation_home',
    activeIcon: '$navigation_home_active',
    name: 'Home',
    refreshable: true,
  },
  {
    title: ['$t.category', 2],
    icon: '$navigation_apps',
    activeIcon: '$navigation_apps_active',
    name: 'Categories',
    refreshable: true,
  },
  {
    title: '$t.update',
    icon: '$navigation_update',
    activeIcon: '$navigation_update_active',
    name: 'Update',
    disabled: true,
  },
  {
    title: '$t.me',
    icon: '$navigation_me',
    activeIcon: '$navigation_me_active',
    name: 'Me',
  },
]
