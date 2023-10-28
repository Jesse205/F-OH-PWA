export interface GOGS_CONTENT_FILE {
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

export interface GOGS_CONTENT_DIRECTORY {
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

export type GOGS_CONTENT_LIST = (GOGS_CONTENT_FILE | GOGS_CONTENT_DIRECTORY)[]
