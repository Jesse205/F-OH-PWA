import type { MetadataSource } from '@/data/metadataSource.ts'

export function computeKeyFromMetadataSourceData({ version, api }: Pick<MetadataSource, 'version' | 'api'>) {
  switch (version) {
    case 'v1':
      return api.base
    default:
      throw new Error(`Unknown metadata source version: ${version}`)
  }
}
