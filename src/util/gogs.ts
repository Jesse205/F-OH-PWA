import { URL_API_GOGS } from '@/data/constants'
import { autoFetchJson } from './fetch'
import type { GogsContentFile } from '@/ts/interfaces/gogs.interfaces'

export interface ApiConfig {
  token: string
  ref?: string
}

// eslint-disable-next-line max-params
export async function getFileContent(
  user: string,
  repository: string,
  path: string,
  config: ApiConfig,
): Promise<GogsContentFile> {
  // eslint-enable-next-line max-params
  const url = `${URL_API_GOGS}/repos/${user}/${repository}/contents/${
    path.startsWith('/') ? path.slice(1) : path
  }?ref=${config.ref ?? 'master'}&token=${config.token}`

  const content = await autoFetchJson<GogsContentFile>(url)
  return content
}
