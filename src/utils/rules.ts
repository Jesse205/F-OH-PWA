import { useI18n } from 'vue-i18n'

export function useRequired() {
  const { t } = useI18n()
  return (value: string) => Boolean(value) || t('field.error.required')
}
