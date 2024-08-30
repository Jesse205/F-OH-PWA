import { getItem } from 'localforage'

import { PATH_API_ALL_APP } from '@/constants/urls'
import { splitAppTags } from '@/utils/apps'
import { apiAxios } from '@/utils/http'
import { completeApiUrl } from '@/utils/url'

import { type MetadataSource } from './metadataSource'

export interface AllAppListResponseData_AppInfo {
  readonly id: number
  readonly name: string
  readonly desc: string
  readonly icon: string
  readonly vender: string
  readonly packageName: string
  readonly version: string
  readonly hapUrl: string
  readonly type: string
  readonly tags: string
  readonly openSourceAddress: string
  readonly releaseTime: string
}
export type AllAppListResponseData = readonly AllAppListResponseData_AppInfo[]

export type AppType = 'app' | 'game' | string
export interface AppInfo {
  readonly id: number
  readonly name: string
  readonly desc: string
  readonly icon: string
  readonly vender: string
  readonly packageName: string
  readonly version: string
  readonly hapUrl: string
  readonly type: AppType
  readonly tags: readonly string[]
  readonly openSourceAddress: string
  readonly releaseTime: string
  readonly metadataSources: readonly MetadataSource['key'][]
}

export async function fetchLocalApps(): Promise<AppInfo[]> {
  const data = await getItem<AppInfo[]>('apps')
  return data ?? []
}

export async function fetchOnlineApps({
  api: { base: baseUrl, apps: appsPath, baseOrigin: baseOriginUrl },
  key,
}: MetadataSource): Promise<AppInfo[]> {
  const response = await apiAxios.get<AllAppListResponseData>(appsPath ?? PATH_API_ALL_APP, {
    baseURL: baseUrl,
  })

  return response.data.map((item) => ({
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
    metadataSources: [key],
  }))
}
