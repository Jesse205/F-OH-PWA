import type { PreferredMetadataSourceData } from '@/data/metadataSource'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export const KEY_METADATA_SOURCE = 'metadata'

export function getPreferredMetadataSource(): PreferredMetadataSourceData[] {
  return JSON.parse(localStorage.getItem(KEY_METADATA_SOURCE) ?? '[]') as PreferredMetadataSourceData[]
}

export function setPreferredMetadataSource(sources: PreferredMetadataSourceData[]): void {
  localStorage.setItem(KEY_METADATA_SOURCE, JSON.stringify(sources))
}

export function usePreferredMetadataSource(): RemovableRef<PreferredMetadataSourceData[]> {
  return useLocalStorage<PreferredMetadataSourceData[]>(KEY_METADATA_SOURCE, [])
}
