

export interface AppInfo {
  id: number
  name: string
  desc: string
  icon: string
  vender: string
  packageName: string
  version: string
  hapUrl: string
  type: 'app' | 'game' | string
  tags: string
  openSourceAddress: string
  releaseTime: string
}

export type AppType = 'app'
