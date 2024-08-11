import { blueprint as harmonyBlueprint } from '@/themes/harmony1'
import { blueprint as material2Blueprint } from '@/themes/material2'
import { getPreferredDesignLanguage } from '@/utils/settings'
import type { Blueprint } from 'vuetify'

/**
 * 设计语言不支持动态切换
 */
export const currentDesign = getPreferredDesignLanguage()

let _currentBlueprint: Blueprint
switch (currentDesign) {
  case 'harmony1':
    _currentBlueprint = harmonyBlueprint
    break
  case 'material2':
    _currentBlueprint = material2Blueprint
    break
  default:
    _currentBlueprint = harmonyBlueprint
}
export const currentBlueprint = _currentBlueprint
