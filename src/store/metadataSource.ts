import { MetadataSource, useInternalMetadataSourceArray, type MetadataSourceData } from '@/data/metadataSource'
import { usePreferredMetadataSources } from '@/preferences/app'
import { useArrayFilter } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, type ComputedRef } from 'vue'

export const useMetadataSourceStore = defineStore('metadata-source', () => {
  const internalSourceDataArray = useInternalMetadataSourceArray()
  const externalSourceDataArray = usePreferredMetadataSources()
  const hasInternalSourceData = computed(() => internalSourceDataArray.value.length > 0)
  const hasExternalSourceData = computed(() => externalSourceDataArray.value.length > 0)

  function getInternalSource(data: MetadataSourceData): MetadataSource {
    return new MetadataSource(data, true)
  }
  function getExternalSource(data: MetadataSourceData): MetadataSource {
    return new MetadataSource(data, false)
  }

  const allSourceArray: ComputedRef<MetadataSource[]> = computed(() => {
    return [
      ...internalSourceDataArray.value.map(getInternalSource),
      ...externalSourceDataArray.value.map(getExternalSource),
    ]
  })
  const enabledSourceArray = useArrayFilter(allSourceArray, (metadata) => metadata.enabled)

  return {
    internalSourceDataArray,
    externalSourceDataArray,
    hasInternalSourceData,
    hasExternalSourceData,
    enabledSourceArray,
  }
})
