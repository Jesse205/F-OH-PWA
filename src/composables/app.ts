import { watchImmediate } from '@vueuse/core'
import { type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

export function useAutoTheme(preferredDark: Ref<boolean>) {
  const theme = useTheme()

  // 自动设置为浏览器的主题
  watchImmediate(preferredDark, (isDark) => {
    theme.global.name.value = isDark ? 'dark' : 'light'
  })
}

export function useAutoLocale(preferredLocale: Ref<string>) {
  const { locale } = useI18n()
  watchImmediate(preferredLocale, (newLocale) => {
    locale.value = newLocale
    document.documentElement.setAttribute('lang', newLocale)
  })
}
