import { URL_API_GOGS } from '@/constants/urls'
import type { GogsContentFile } from '@/ts/interfaces/gogs.interfaces'

import { getAxiosInstance } from './axios'

export interface ApiConfig {
  token: string
  ref?: string
}

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

  const content = await getAxiosInstance().get<GogsContentFile>(url)
  return content.data
}
