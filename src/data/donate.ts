import { ComputedRef, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import WESTINYANG_ALIPAY_QRCODE from '@/assets/images/donate/westinyang/alipay.webp'
import WESTINYANG_WECHAT_QRCODE from '@/assets/images/donate/westinyang/wechat.webp'
import JESSE205_QQ_QRCODE from '@/assets/images/donate/jesse205/qq.jpg'
import JESSE205_WECHAT_QRCODE from '@/assets/images/donate/jesse205/wechat.jpg'

const COLOR_AMBER = '#FFC107'
const COLOR_BLUE = '#2196F3'
const COLOR_GREEN = '#4CAF50'

interface Platform {
  name: string | ComputedRef<string>
  color: string
  icon: string
  image: string
}

interface Presion {
  name: string | ComputedRef<string>
  summary: string | ComputedRef<string>
  selected: number
  platforms: Platform[]
  error?: boolean
  errorMsg?: string
}

export function useDonate() {
  const { t } = useI18n()
  return ref<Presion[]>([
    {
      name: computed(() => t('developer.westinyang.name')),
      summary: computed(() => t('developer.westinyang.description')),
      selected: 0,
      platforms: [
        {
          name: computed(() => t('appNames.wechat')),
          color: COLOR_GREEN,
          icon: 'mdi-wechat',
          image: WESTINYANG_WECHAT_QRCODE
        },
        {
          name: computed(() => t('appNames.alipay')),
          color: COLOR_BLUE,
          icon: 'mdi-wechat',
          image: WESTINYANG_ALIPAY_QRCODE
        }
      ]
    },
    {
      name: t('developer.jesse205.name'),
      summary: computed(() => t('developer.eddie.description')),
      selected: 0,
      error: true,
      errorMsg: '这码能扫？',
      platforms: [
        {
          name: computed(() => t('appNames.qq')),
          color: COLOR_BLUE,
          icon: 'mdi-wechat',
          image: JESSE205_QQ_QRCODE
        },
        {
          name: computed(() => t('appNames.wechat')),
          color: COLOR_GREEN,
          icon: 'mdi-wechat',
          image: JESSE205_WECHAT_QRCODE
        }
      ]
    }
  ])
}
