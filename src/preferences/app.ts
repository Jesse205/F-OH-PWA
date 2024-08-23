import type { PreferredMetadataSourceData } from '@/data/metadataSource'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export const KEY_METADATA_SOURCES = 'metadata-sources'

export function getPreferredMetadataSources(): PreferredMetadataSourceData[] {
  return JSON.parse(localStorage.getItem(KEY_METADATA_SOURCES) ?? '[]') as PreferredMetadataSourceData[]
}

export function setPreferredMetadataSources(sources: PreferredMetadataSourceData[]): void {
  localStorage.setItem(KEY_METADATA_SOURCES, JSON.stringify(sources))
}

export function usePreferredMetadataSources(): RemovableRef<PreferredMetadataSourceData[]> {
  return useLocalStorage<PreferredMetadataSourceData[]>(KEY_METADATA_SOURCES, [])
}
