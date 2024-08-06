import IMAGE_QRCODE_JESSE205_ALIPAY from '@/assets/images/donate/jesse205/alipay.webp'
import IMAGE_QRCODE_JESSE205_ALIPAY_KICKBACK from '@/assets/images/donate/jesse205/alipay_kickback.webp'
import IMAGE_QRCODE_JESSE205_QQ from '@/assets/images/donate/jesse205/qq.webp'
import IMAGE_QRCODE_JESSE205_WECHAT from '@/assets/images/donate/jesse205/wechat.jpg'
import IMAGE_QRCODE_WESTINYANG_ALIPAY from '@/assets/images/donate/westinyang/alipay.webp'
import IMAGE_QRCODE_WESTINYANG_WECHAT from '@/assets/images/donate/westinyang/wechat.webp'

// const COLOR_AMBER = '#FFC107'
const COLOR_BLUE = '#2196F3'
const COLOR_GREEN = '#4CAF50'
const COLOR_RED = '#F44336'

export interface DonatePlatform {
  name: string
  color?: string
  icon?: string
  key: string
  image?: string
}

export interface DonatePerson {
  name: string
  summary: string
  key: string
  platforms: DonatePlatform[]
}

export const donatePersons: DonatePerson[] = [
  {
    name: '$t.developer.westinyang.name',
    summary: '$t.developer.westinyang.description',
    key: 'westinyang',
    platforms: [
      {
        name: '$t.app.wechat',
        color: COLOR_GREEN,
        icon: 'mdi-wechat',
        key: 'wechat',
        image: IMAGE_QRCODE_WESTINYANG_WECHAT,
      },
      {
        name: '$t.app.alipay',
        color: COLOR_BLUE,
        icon: 'mdi-wechat',
        key: 'alipay',
        image: IMAGE_QRCODE_WESTINYANG_ALIPAY,
      },
    ],
  },
  {
    name: '$t.developer.jesse205.name',
    summary: '$t.developer.eddie.description',
    key: 'jesse205',
    platforms: [
      {
        name: '$t.app.qq',
        color: COLOR_BLUE,
        icon: 'mdi-wechat',
        key: 'qq',
        image: IMAGE_QRCODE_JESSE205_QQ,
      },
      {
        name: '$t.app.wechat',
        color: COLOR_GREEN,
        icon: 'mdi-wechat',
        key: 'wechat',
        image: IMAGE_QRCODE_JESSE205_WECHAT,
      },
      {
        name: '$t.app.alipay',
        color: COLOR_BLUE,
        icon: 'mdi-alipay',
        key: 'alipay',
        image: IMAGE_QRCODE_JESSE205_ALIPAY,
      },
      {
        name: '$t.app.alipay_kickback',
        color: COLOR_RED,
        icon: 'mdi-alipay',
        key: 'alipay_kickback',
        image: IMAGE_QRCODE_JESSE205_ALIPAY_KICKBACK,
      },
    ],
  },
]
