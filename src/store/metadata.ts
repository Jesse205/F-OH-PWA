import { URL_API_CLIENT, URL_API_CLIENT_ORIGIN, URL_API_WEB, URL_API_WEB_ORIGIN } from '@/constants/urls'
import type { InternalMetadata, Metadata } from '@/data/metadata'
import { usePreferredMetadata } from '@/preferences/app'
import { isClientApp } from '@/utils/global'
import { transformInternalRepositories2Metadata, transformPreferredRepositories2Metadata } from '@/utils/metadata'
import { completeUrl } from '@/utils/url'
import { defineStore } from 'pinia'
import { computed, reactive, readonly, ref, type ComputedRef, type DeepReadonly } from 'vue'

export const useMetadataStore = defineStore('metadata', () => {
  const internalMetadataArray: InternalMetadata[] = reactive([
    {
      name: 'F-OH PWA',
      description: 'F-OH PWA Default Metadata',
      version: 'v1',
      api: {
        base: completeUrl(isClientApp ? URL_API_CLIENT : URL_API_WEB),
        baseOrigin: completeUrl(isClientApp ? URL_API_CLIENT_ORIGIN : URL_API_WEB_ORIGIN),
      },
      enabled: ref(true),
    },
  ])
  const externalMetadataArray = usePreferredMetadata()

  const allMetadataArray: ComputedRef<DeepReadonly<Metadata[]>> = computed(() => {
    return readonly([
      ...internalMetadataArray.map(transformInternalRepositories2Metadata),
      ...externalMetadataArray.value.map(transformPreferredRepositories2Metadata),
    ])
  })
  const enabledMetadataArray = computed(() => allMetadataArray.value.filter((metadata) => metadata.enabled))

  return { internalMetadataArray, externalMetadataArray, enabledMetadataArray }
})
