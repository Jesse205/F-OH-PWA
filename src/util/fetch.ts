import axios from 'axios'
import type { AxiosAdapter, AxiosInstance } from 'axios'
import axiosTauriApiAdapter from 'axios-tauri-api-adapter'
import { isTauri } from './app'

let axiosInstance: AxiosInstance | null = null

export function getAxiosInstance() {
  if (!axiosInstance) {
    let adapter: AxiosAdapter | undefined
    if (isTauri) adapter = axiosTauriApiAdapter
    axiosInstance = axios.create({ adapter })
  }
  return axiosInstance
}
