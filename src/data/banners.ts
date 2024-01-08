import IMAGE_BANNER1 from '@/assets/images/main_banner_1.png'
import IMAGE_BANNER2 from '@/assets/images/main_banner_2.png'
import IMAGE_BANNER3 from '@/assets/images/main_banner_3.png'
import type { Banners } from '@/ts/interfaces/home.interfaces'

export const banners: Banners = {
  data: [
    {
      image: IMAGE_BANNER1,
      alt: '',
    },
    {
      image: IMAGE_BANNER2,
      alt: '',
    },
    {
      image: IMAGE_BANNER3,
      alt: '',
    },
  ],
  ratio: 18 / 9,
}
