export interface HomeData {
  announcement: string
  showAnnouncement: boolean
}

/**
 * 横幅数据
 */
export interface Banners {
  /**
   * 横幅数据
   */
  data: Array<BannersItem>
  /**
   * 比例
   */
  ratio: number
}

export interface BannersItem {
  src?: string
  image: string
}
