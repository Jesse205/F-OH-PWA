import IMAGE_BANNER_2 from '@/assets/images/banners/banner2.png'
import IMAGE_BANNER_3 from '@/assets/images/banners/banner3.png'
import IMAGE_BANNER_FOH from '@/assets/images/banners/foh.png'

export interface HomeData {
  announcement?: string
  showAnnouncement: boolean
}

export interface Banner {
  src?: string
  alt: string
  image: string
}

/**
 * 首页横幅数据
 */
export interface BannersData {
  /**
   * 横幅数据
   */
  data: Banner[]
  /**
   * 图片比例
   */
  ratio: number
}

export const bannersData: BannersData = {
  data: [
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
  ratio: 18 / 9,
}

export interface RouteItemData {
  title: string | [string, ...any]
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
    icon: '$home',
    activeIcon: '$homeFilled',
    name: 'Home',
    refreshable: true,
  },
  {
    title: ['$t.category', 2],
    icon: '$apps',
    activeIcon: '$appsFilled',
    name: 'Categories',
    refreshable: true,
  },
  {
    title: '$t.update',
    icon: '$update',
    activeIcon: '$updateFilled',
    name: 'Update',
    disabled: true,
  },
  {
    title: '$t.me',
    icon: '$account',
    activeIcon: '$accountFilled',
    name: 'Me',
  },
]
