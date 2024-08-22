import type { InternalMetadataSource, MetadataSource } from '@/data/metadataSource.ts'
import type { PreferredMetadataSource } from '@/preferences/app'

function getMetadataKeyFromApiBase({ version, api }: Pick<MetadataSource, 'version' | 'api'>) {
  switch (version) {
    case 'v1':
      return api.base
    default:
      throw new Error(`Unknown metadata source version: ${version}`)
  }
}

export function transformPreferredMetadataSource2MetadataSource(source: PreferredMetadataSource): MetadataSource {
  return { ...source, key: getMetadataKeyFromApiBase(source), internal: false }
}

export function transformInternalSource2MetadataSource(source: InternalMetadataSource): MetadataSource {
  return { ...source, key: getMetadataKeyFromApiBase(source), internal: true }
}
