import type { PreferredInternalMetadataSourceState, PreferredMetadataSourceData } from '@/data/metadataSource'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export const KEY_METADATA_SOURCES = 'metadata-sources'
export const KEY_INTERNAL_METADATA_SOURCE_STATES = 'internal-metadata-source-states'

export function getPreferredMetadataSources(): PreferredMetadataSourceData[] {
  return JSON.parse(localStorage.getItem(KEY_METADATA_SOURCES) ?? '[]') as PreferredMetadataSourceData[]
}

export function setPreferredMetadataSources(sources: PreferredMetadataSourceData[]): void {
  localStorage.setItem(KEY_METADATA_SOURCES, JSON.stringify(sources))
}

export function usePreferredMetadataSources(): RemovableRef<PreferredMetadataSourceData[]> {
  return useLocalStorage<PreferredMetadataSourceData[]>(KEY_METADATA_SOURCES, [])
}
export function usePreferredInternalMetadataSourceStates(): RemovableRef<PreferredInternalMetadataSourceState> {
  return useLocalStorage<PreferredInternalMetadataSourceState>(
    KEY_INTERNAL_METADATA_SOURCE_STATES,
    {
      foh: true,
    },
    {
      mergeDefaults: true,
    },
  )
}
