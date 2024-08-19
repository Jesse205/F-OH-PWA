import type { InternalMetadata, Metadata } from '@/data/metadata'
import type { PreferredMetadata } from '@/preferences/app'

function getMetadataKeyFromApiBase({ version, api }: Pick<Metadata, 'version' | 'api'>) {
  switch (version) {
    case 'v1':
      return api.base
    default:
      throw new Error(`Unknown metadata version: ${version}`)
  }
}

export function transformPreferredRepositories2Metadata(metadata: PreferredMetadata): Metadata {
  return { ...metadata, key: getMetadataKeyFromApiBase(metadata), internal: false }
}

export function transformInternalRepositories2Metadata(metadata: InternalMetadata): Metadata {
  return { ...metadata, key: getMetadataKeyFromApiBase(metadata), internal: true }
}
