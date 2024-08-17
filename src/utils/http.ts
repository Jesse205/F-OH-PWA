import type { AxiosAdapter, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import tauriHttpAdapter from 'axios-tauri-api-adapter'

import { isTauriApp } from './global'
import { currentApiUrl } from './url'
const xhrAdapter = axios.getAdapter('xhr')

/**
 * 自适应的适配器，可以根据地址自动切换到 Tauri 的 http 适配器
 */
const adaptiveAdapter: AxiosAdapter = (config: InternalAxiosRequestConfig) => {
  const url = new URL(config.url ?? '/', config.baseURL)
  // 仅 Tauri 环境、且请求域名、协议与当前域名、协议不一致时，才使用 Tauri 的 http 适配器
  if (isTauriApp && !(url.host === location.host && url.protocol === location.protocol)) {
    return tauriHttpAdapter(config)
  } else {
    return xhrAdapter(config)
  }
}

export const apiAxios: AxiosInstance = axios.create({ adapter: adaptiveAdapter, baseURL: currentApiUrl })
