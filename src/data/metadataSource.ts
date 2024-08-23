import {
  PATH_API_ALL_APP,
  PATH_API_HOME,
  URL_API_CLIENT,
  URL_API_CLIENT_ORIGIN,
  URL_API_WEB,
  URL_API_WEB_ORIGIN,
} from '@/constants/urls'
import { splitAppTags } from '@/utils/apps'
import { isClientApp } from '@/utils/global'
import { apiAxios } from '@/utils/http'
import { computeKeyFromMetadataSourceData } from '@/utils/metadataSource'
import { completeApiUrl, completeUrl } from '@/utils/url'
import { readonly, ref, type Ref } from 'vue'
import type { AllAppListResponseData, AppInfo } from './apps'
import type { HomeResponseData } from './home'

export interface BaseMetadataSourceData {
  name: string
  description?: string
  enabled: boolean
}

export interface MetadataSourceV1Data extends BaseMetadataSourceData {
  version: 'v1'
  api: {
    base: string
    baseOrigin?: string
    home?: string
    apps?: string
  }
}

export type MetadataSourceData = MetadataSourceV1Data
export type InternalMetadataSourceData = MetadataSourceData
export type ExternalMetadataSourceData = MetadataSourceData
export type PreferredMetadataSourceData = ExternalMetadataSourceData

export class MetadataSource implements MetadataSourceData {
  name: string
  description?: string
  enabled: boolean
  version: 'v1'
  api: { base: string; baseOrigin?: string; home?: string; apps?: string }
  key: string
  constructor(
    data: MetadataSourceData,
    public isInternal: boolean,
  ) {
    this.name = data.name
    this.description = data.description
    this.enabled = data.enabled
    this.version = data.version
    this.api = data.api
    this.key = computeKeyFromMetadataSourceData(data)
  }
  private axiosGet<T>(path: string) {
    return apiAxios.get<T>(path, {
      baseURL: this.api.base,
    })
  }

  async fetchApps(): Promise<readonly AppInfo[]> {
    const { base: baseUrl, apps: appsPath, baseOrigin: baseOriginUrl } = this.api
    const response = await this.axiosGet<AllAppListResponseData>(appsPath ?? PATH_API_ALL_APP)

    return readonly(
      response.data.map<AppInfo>((item) => ({
        id: item.id,
        name: item.name,
        desc: item.desc,
        icon: completeApiUrl(item.icon, baseUrl),
        vender: item.vender,
        packageName: item.packageName,
        version: item.version,
        hapUrl: completeApiUrl(item.hapUrl, baseOriginUrl),
        type: item.type,
        openSourceAddress: item.openSourceAddress,
        releaseTime: item.releaseTime,
        tags: splitAppTags(item.tags),
        metadataSources: [this.key],
      })),
    )
  }
  async fetchHome() {
    const response = await this.axiosGet<HomeResponseData>(this.api.home ?? PATH_API_HOME)
    return response.data
  }
}

export const defaultPreferredMetadataSource = readonly<PreferredMetadataSourceData>({
  name: '',
  description: '',
  api: {
    base: '',
  },
  enabled: true,
  version: 'v1',
})

export function useInternalMetadataSourceArray() {
  const internalMetadataSourceDataArray: Ref<InternalMetadataSourceData[]> = ref([
    {
      name: 'F-OH PWA',
      description: 'F-OH PWA Default Metadata',
      version: 'v1',
      api: {
        base: completeUrl(isClientApp ? URL_API_CLIENT : URL_API_WEB),
        baseOrigin: completeUrl(isClientApp ? URL_API_CLIENT_ORIGIN : URL_API_WEB_ORIGIN),
      },
      enabled: ref(true),
    },
  ])
  return internalMetadataSourceDataArray
}
