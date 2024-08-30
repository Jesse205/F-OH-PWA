import type { Blueprint } from 'vuetify'

import { getPreferredDesignLanguage } from '@/preferences/ui'
import * as harmony1Config from '@/themes/harmony1'
import * as material2Config from '@/themes/material2'

import type { DesignFeatures } from './base'

// 设计语言不支持动态切换
export const currentDesign = getPreferredDesignLanguage()

let _currentDesignConfig: { blueprint: Blueprint; features: DesignFeatures }
switch (currentDesign) {
  case 'material2':
    _currentDesignConfig = material2Config
    break
  case 'harmony1':
  default:
    _currentDesignConfig = harmony1Config
}
export const currentDesignConfig = _currentDesignConfig
