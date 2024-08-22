import type { MetadataSourceV1 } from '@/data/metadataSource'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export interface BasePreferredMetadataSource {
  name: string
  description?: string
  enabled: boolean
}

export interface PreferredMetadataSourceV1 extends BasePreferredMetadataSource {
  version: 'v1'
  api: MetadataSourceV1['api']
}

export type PreferredMetadataSource = PreferredMetadataSourceV1

export const KEY_METADATA_SOURCE = 'metadata'

export function getPreferredMetadataSource(): PreferredMetadataSource[] {
  return JSON.parse(localStorage.getItem(KEY_METADATA_SOURCE) ?? '[]') as PreferredMetadataSource[]
}

export function setPreferredMetadataSource(sources: PreferredMetadataSource[]): void {
  localStorage.setItem(KEY_METADATA_SOURCE, JSON.stringify(sources))
}

export function usePreferredMetadataSource(): RemovableRef<PreferredMetadataSource[]> {
  return useLocalStorage<PreferredMetadataSource[]>(KEY_METADATA_SOURCE, [])
}
