export interface GogsContentFile {
  type: 'file'
  encoding: 'base64' | string
  size: number
  name: string
  path: string
  content: string
  sha: string
  url: string
  git_url: string
  html_url: string
  download_url: string
  _links: {
    git: string
    self: string
    html: string
  }
}

export interface GogsContentDirectory {
  type: 'dir'
  size: 0
  name: string
  path: string
  sha: string
  url: string
  git_url: string
  html_url: string
  download_url: string
  _links: {
    git: string
    self: string
    html: string
  }
}

export type GogsContentList = Array<GogsContentFile | GogsContentDirectory>

export interface FileChanges {
  [index: number]: string
}

export interface EditFileWork {
  file: string
  changes: FileChanges
}
