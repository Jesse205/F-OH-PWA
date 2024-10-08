import { getPreferredMetadataSources, setPreferredMetadataSources } from '@/preferences/app'

import { completeUrl } from './url'

export function upgrade(): void {
  if (localStorage.getItem('server')) {
    localStorage.setItem('api-url', localStorage.getItem('server') ?? '')
    localStorage.removeItem('server')
  }
  if (localStorage.getItem('api-url')) {
    const preferredMetadata = getPreferredMetadataSources()
    preferredMetadata.push({
      name: 'My metadata',
      api: {
        base: completeUrl(localStorage.getItem('api-url') ?? ''),
      },
      enabled: true,
      version: 'v1',
    })
    localStorage.removeItem('api-url')
    setPreferredMetadataSources(preferredMetadata)
  }
}
