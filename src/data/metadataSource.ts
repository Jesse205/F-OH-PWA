import type { PreferredMetadataSource } from '@/preferences/app'
import { readonly } from 'vue'

export interface BaseMetadataSource {
  name: string
  description?: string
  key: string
  enabled: boolean
  readonly internal: boolean
}

export interface MetadataSourceV1 extends BaseMetadataSource {
  version: 'v1'
  api: {
    base: string
    baseOrigin?: string
    home?: string
    apps?: string
  }
}

export type MetadataSource = MetadataSourceV1

export type InternalMetadataSource = Omit<MetadataSource, 'internal' | 'key'>

export const defaultPreferredMetadataSource = readonly<PreferredMetadataSource>({
  name: '',
  description: '',
  api: {
    base: '',
  },
  enabled: true,
  version: 'v1',
})
