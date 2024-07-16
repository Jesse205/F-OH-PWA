import { getPreferredServerUrl, removePreferredServerUrl, setPreferredApiUrl } from './settings'

export function upgrade() {
  const serverUrl = getPreferredServerUrl()
  if (serverUrl) {
    setPreferredApiUrl(serverUrl)
    removePreferredServerUrl()
  }
}
