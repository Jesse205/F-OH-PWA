import { URL_API_CLIENT, URL_API_CLIENT_ORIGIN, URL_API_WEB, URL_API_WEB_ORIGIN } from '@/constants/urls'
import { getPreferredMetadata, type PreferredMetadata } from '@/preferences/app'
import { isClientApp } from '@/utils/global'
import { completeUrl } from '@/utils/url'

export interface MetadataApi {
  base: string
  baseOrigin?: string
  home?: string
  apps?: string
}

export interface Metadata {
  name: string
  description?: string
  api: MetadataApi
  enabled: boolean
  internal: boolean
}

export type InternalMetadata = Omit<Metadata, 'internal'>

const INTERNAL_METADATA: InternalMetadata[] = [
  {
    name: 'F-OH',
    description: 'F-OH Default Metadata',
    api: {
      base: completeUrl(isClientApp ? URL_API_CLIENT : URL_API_WEB),
      baseOrigin: completeUrl(isClientApp ? URL_API_CLIENT_ORIGIN : URL_API_WEB_ORIGIN),
    },
    get enabled() {
      return true
    },
    set enabled(value) {},
  },
]

function transformPreferredRepositories2Metadata(metadata: PreferredMetadata): Metadata {
  return { ...metadata, internal: false }
}

function transformInternalRepositories2Metadata(metadata: InternalMetadata): Metadata {
  return { ...metadata, internal: true }
}

export function getInternalMetadataArray(): Metadata[] {
  return INTERNAL_METADATA.map(transformInternalRepositories2Metadata)
}

/**
 * 获取用户手动添加的元数据数组
 */
export function getCustomMetadataArray(): Metadata[] {
  return getPreferredMetadata().map(transformPreferredRepositories2Metadata)
}

/**
 * 获取用户手动添加的和默认的元数据数组
 */
export function getMetadataArray(): Metadata[] {
  const repositories: Metadata[] = getCustomMetadataArray()
  repositories.unshift(...getInternalMetadataArray())
  return repositories
}

export function getEnabledMetadataArray(): Metadata[] {
  return getMetadataArray().filter((metadata) => metadata.enabled)
}
