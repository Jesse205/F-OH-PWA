import type { PreferredMetadata } from '@/preferences/app'
import { readonly } from 'vue'

export interface BaseMetadata {
  name: string
  description?: string
  key: string
  enabled: boolean
  readonly internal: boolean
}

export interface MetadataV1 extends BaseMetadata {
  version: 'v1'
  api: {
    base: string
    baseOrigin?: string
    home?: string
    apps?: string
  }
}

export type Metadata = MetadataV1

export type InternalMetadata = Omit<Metadata, 'internal' | 'key'>

export const defaultPreferredMetadata = readonly<PreferredMetadata>({
  name: '',
  description: '',
  api: {
    base: '',
  },
  enabled: true,
  version: 'v1',
})
