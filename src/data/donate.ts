import JESSE205_ALIPAY_QRCODE from '@/assets/images/donate/jesse205/alipay.webp'
import JESSE205_ALIPAY_KICKBACK_QRCODE from '@/assets/images/donate/jesse205/alipay_kickback.webp'
import JESSE205_QQ_QRCODE from '@/assets/images/donate/jesse205/qq.webp'
import JESSE205_WECHAT_QRCODE from '@/assets/images/donate/jesse205/wechat.jpg'
import WESTINYANG_ALIPAY_QRCODE from '@/assets/images/donate/westinyang/alipay.webp'
import WESTINYANG_WECHAT_QRCODE from '@/assets/images/donate/westinyang/wechat.webp'
import type { DonatePerson } from '@/ts/interfaces/donate.interfaces'

// const COLOR_AMBER = '#FFC107'
const COLOR_BLUE = '#2196F3'
const COLOR_GREEN = '#4CAF50'
const COLOR_RED = '#F44336'

export const donateData: DonatePerson[] = [
  {
    name: '$t.developer.westinyang.name',
    summary: '$t.developer.westinyang.description',
    key: 'westinyang',
    platforms: [
      {
        name: '$t.appNames.wechat',
        color: COLOR_GREEN,
        icon: 'mdi-wechat',
        key: 'wechat',
        image: WESTINYANG_WECHAT_QRCODE,
      },
      {
        name: '$t.appNames.alipay',
        color: COLOR_BLUE,
        icon: 'mdi-wechat',
        key: 'alipay',
        image: WESTINYANG_ALIPAY_QRCODE,
      },
    ],
  },
  {
    name: '$t.developer.jesse205.name',
    summary: '$t.developer.eddie.description',
    key: 'jesse205',
    platforms: [
      {
        name: '$t.appNames.qq',
        color: COLOR_BLUE,
        icon: 'mdi-wechat',
        key: 'qq',
        image: JESSE205_QQ_QRCODE,
      },
      {
        name: '$t.appNames.wechat',
        color: COLOR_GREEN,
        icon: 'mdi-wechat',
        key: 'wechat',
        image: JESSE205_WECHAT_QRCODE,
      },
      {
        name: '$t.appNames.alipay',
        color: COLOR_BLUE,
        icon: 'mdi-alipay',
        key: 'alipay',
        image: JESSE205_ALIPAY_QRCODE,
      },
      {
        name: '$t.appNames.alipay_kickback',
        color: COLOR_RED,
        icon: 'mdi-alipay',
        key: 'alipay_kickback',
        image: JESSE205_ALIPAY_KICKBACK_QRCODE,
      },
    ],
  },
]
