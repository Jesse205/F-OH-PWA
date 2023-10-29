import { isTauri } from '@/util/app'
import { http } from '@tauri-apps/api'

type HttpVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'

interface FetchOptions {
  method: HttpVerb
}

export async function autoFetchJson(url: string, options?: FetchOptions) {
  if (!isTauri()) {
    const reponse = await fetch(url, options)
    return await toJsonIfOk(reponse)
  } else {
    const reponse = await http.fetch(url, options)
    if (!reponse.ok) throw reponse.status
    return reponse.data
  }
}

export function toJsonIfOk(res: Response): Promise<any> {
  if (!res.ok) throw res.statusText
  return res.json()
}
