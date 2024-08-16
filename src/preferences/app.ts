import type { MetadataApi } from '@/data/metadata'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export interface PreferredMetadata {
  name: string
  description?: string
  api: MetadataApi
  enabled: boolean
}
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
