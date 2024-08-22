import { URL_API_CLIENT, URL_API_CLIENT_ORIGIN, URL_API_WEB, URL_API_WEB_ORIGIN } from '@/constants/urls'
import type { InternalMetadataSource, MetadataSource } from '@/data/metadataSource'
import { usePreferredMetadataSource } from '@/preferences/app'
import { isClientApp } from '@/utils/global'
import { transformInternalSource2MetadataSource, transformPreferredMetadataSource2MetadataSource } from '@/utils/metadataSource'
import { completeUrl } from '@/utils/url'
import { defineStore } from 'pinia'
import { computed, reactive, readonly, ref, type ComputedRef, type DeepReadonly } from 'vue'

export const useMetadataSourceStore = defineStore('metadata-source', () => {
  const internalMetadataSourceArray: InternalMetadataSource[] = reactive([
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
  const externalMetadataSourceArray = usePreferredMetadataSource()

  const allMetadataSourceArray: ComputedRef<DeepReadonly<MetadataSource[]>> = computed(() => {
    return readonly([
      ...internalMetadataSourceArray.map(transformInternalSource2MetadataSource),
      ...externalMetadataSourceArray.value.map(transformPreferredMetadataSource2MetadataSource),
    ])
  })
  const enabledMetadataArray = computed(() => allMetadataSourceArray.value.filter((metadata) => metadata.enabled))

  return { internalMetadataArray: internalMetadataSourceArray, externalMetadataArray: externalMetadataSourceArray, enabledMetadataArray }
})
