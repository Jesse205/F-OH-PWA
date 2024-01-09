export interface DonatePlatform {
  name: string
  color: string
  icon?: string
  key: string
  image: string
}

export interface DonatePerson {
  name: string
  summary: string
  key: string
  platforms: DonatePlatform[]
}
