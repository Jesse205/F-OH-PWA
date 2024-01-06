import JESSE205_ALIPAY_QRCODE from '@/assets/images/donate/jesse205/alipay.webp'
import JESSE205_ALIPAY_KICKBACK_QRCODE from '@/assets/images/donate/jesse205/alipay_kickback.webp'
import JESSE205_QQ_QRCODE from '@/assets/images/donate/jesse205/qq.webp'
import JESSE205_WECHAT_QRCODE from '@/assets/images/donate/jesse205/wechat.jpg'
import WESTINYANG_ALIPAY_QRCODE from '@/assets/images/donate/westinyang/alipay.webp'
import WESTINYANG_WECHAT_QRCODE from '@/assets/images/donate/westinyang/wechat.webp'
import type { ComputedRef } from 'vue'
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

// const COLOR_AMBER = '#FFC107'
const COLOR_BLUE = '#2196F3'
const COLOR_GREEN = '#4CAF50'
const COLOR_RED = '#F44336'

interface Platform {
  name: string | ComputedRef<string>
  color: string
  icon: string
  image: string
}

interface Person {
  name: string | ComputedRef<string>
  summary: string | ComputedRef<string>
  selected: number
  platforms: Platform[]
}

export function useDonate(): Person[] {
  const { t } = useI18n()
  return reactive<Person[]>([
    {
      name: computed(() => t('developer.westinyang.name')),
      summary: computed(() => t('developer.westinyang.description')),
      selected: 0,
      platforms: [
        {
          name: computed(() => t('appNames.wechat')),
          color: COLOR_GREEN,
          icon: 'mdi-wechat',
          image: WESTINYANG_WECHAT_QRCODE,
        },
        {
          name: computed(() => t('appNames.alipay')),
          color: COLOR_BLUE,
          icon: 'mdi-wechat',
          image: WESTINYANG_ALIPAY_QRCODE,
        },
      ],
    },
    {
      name: t('developer.jesse205.name'),
      summary: computed(() => t('developer.eddie.description')),
      selected: 0,
      platforms: [
        {
          name: computed(() => t('appNames.qq')),
          color: COLOR_BLUE,
          icon: 'mdi-wechat',
          image: JESSE205_QQ_QRCODE,
        },
        {
          name: computed(() => t('appNames.wechat')),
          color: COLOR_GREEN,
          icon: 'mdi-wechat',
          image: JESSE205_WECHAT_QRCODE,
        },
        {
          name: computed(() => t('appNames.alipay')),
          color: COLOR_BLUE,
          icon: 'mdi-wechat',
          image: JESSE205_ALIPAY_QRCODE,
        },
        {
          name: computed(() => t('appNames.alipay_kickback')),
          color: COLOR_RED,
          icon: 'mdi-wechat',
          image: JESSE205_ALIPAY_KICKBACK_QRCODE,
        },
      ],
    },
  ])
}
