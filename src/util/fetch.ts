import { isTauri } from '@/util/app'
import { http } from '@tauri-apps/api'

type HttpVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'

interface FetchOptions {
  method: HttpVerb
}

export async function autoFetchJson<T = any>(url: string, options?: FetchOptions): Promise<T> {
  if (!isTauri()) {
    const reponse = await fetch(url, options)
    return await toJsonIfOk(reponse)
  } else {
    const reponse = await http.fetch(url, options)
    if (!reponse.ok) throw reponse.status
    return reponse.data as T
  }
}

export function toJsonIfOk(res: Response): Promise<any> {
  if (!res.ok) throw res.statusText
  return res.json()
}
