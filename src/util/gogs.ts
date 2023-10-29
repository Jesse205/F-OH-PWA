import { URL_API_GOGS } from '@/data/constants'
import { autoFetchJson, toJsonIfOk } from './fetch'
import { GogsContentFile } from '@/ts/interfaces/gogs.interfaces'

export interface ApiConfig {
  token: string
  ref?: string
}

export async function getFileContent(
  user: string,
  repository: string,
  path: string,
  config: ApiConfig
): Promise<GogsContentFile> {
  const url=`${URL_API_GOGS}/repos/${user}/${repository}/contents/${path.startsWith('/') ? path.slice(1) : path}?ref=${
    config.ref ?? 'master'
  }&token=${config.token}`

  const content = await autoFetchJson<GogsContentFile>(url)
  return content
}
