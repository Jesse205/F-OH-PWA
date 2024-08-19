import type { MetadataV1 } from '@/data/metadata'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export interface BasePreferredMetadata {
  name: string
  description?: string
  enabled: boolean
}

export interface PreferredMetadataV1 extends BasePreferredMetadata {
  version: 'v1'
  api: MetadataV1['api']
}

export type PreferredMetadata = PreferredMetadataV1

export const KEY_METADATA = 'metadata'

export function getPreferredMetadata(): PreferredMetadata[] {
  return JSON.parse(localStorage.getItem(KEY_METADATA) ?? '[]') as PreferredMetadata[]
}

export function setPreferredMetadata(repositories: PreferredMetadata[]): void {
  localStorage.setItem(KEY_METADATA, JSON.stringify(repositories))
}

export function usePreferredMetadata(): RemovableRef<PreferredMetadata[]> {
  return useLocalStorage<PreferredMetadata[]>(KEY_METADATA, [])
}
