import { PATH_API_ALL_APP } from '@/constants/urls'
import { splitAppTags } from '@/utils/apps'
import { apiAxios } from '@/utils/http'
import { completeApiUrl } from '@/utils/url'
import { getItem } from 'localforage'
import { type MetadataApi } from './metadata'

interface AllAppListResponseData_AppInfo {
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
type AllAppListResponseData = AllAppListResponseData_AppInfo[]

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
}

export async function fetchLocalApps() {
  const data = await getItem<AppInfo[]>('apps')
  return data ?? []
}

export async function fetchOnlineApps({
  base: baseUrl,
  apps: appsPath,
  baseOrigin: baseOriginUrl,
}: MetadataApi): Promise<AppInfo[]> {
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
  }))
}
