import { isTauri } from '@/util/app'
import { http } from '@tauri-apps/api'

type HttpVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'

interface FetchOptions {
  method: HttpVerb
}

export async function autoFetchJson<T = any>(url: string, options?: FetchOptions): Promise<T> {
  if (!isTauri()) {
    const reponse = await fetch(url, options)
    return await toJsonIfOk<T>(reponse)
  } else {
    const reponse = await http.fetch<T>(url, options)
    if (!reponse.ok) throw reponse.status
    return reponse.data
  }
}

export function toJsonIfOk<T = any>(res: Response): Promise<T> {
  if (!res.ok) throw res.statusText || 'Unknown error'
  return res.json()
}
