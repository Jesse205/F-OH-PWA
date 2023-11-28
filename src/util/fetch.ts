import { isTauri } from '@/util/app'
import { http } from '@tauri-apps/api'

type HttpVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'

interface FetchOptions {
  method: HttpVerb
}

/**
 * 根据运行环境自动拉取并解析 json。
 * 如果状态码不为 ok，该方法也会抛出异常
 * @returns
 */
export async function autoFetchJson<T = any>(url: string, options?: FetchOptions): Promise<T> {
  if (!isTauri) {
    const reponse = await fetch(url, options)
    return await toJsonIfOk<T>(reponse)
  } else {
    const reponse = await http.fetch<T>(url, options)
    if (!reponse.ok) throw reponse.status
    return reponse.data
  }
}

/**
 * 如果状态码不为 ok，该方法也会抛出异常，否则解析json
 */
export async function toJsonIfOk<T = any>(res: Response): Promise<T> {
  if (!res.ok) throw `${res.status}: ${res.statusText || 'Unknown error'}`
  return await res.json()
}
