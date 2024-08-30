<script lang="ts" setup>
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'

import { useMetadataSourceStore } from '@/store/metadataSource'
import { isUnsafeUrl } from '@/utils/url'

const exampleImgElement = ref<HTMLImageElement>()
const { width: exampleImageElementWidth } = useElementSize(exampleImgElement)
const exampleImageWidth = 820

defineExpose({
  title: 'Chrome 解决 API 不安全',
})
const metadataSourceStore = useMetadataSourceStore()

const urls = computed(() =>
  metadataSourceStore.enabledSourceArray
    .map((source) => source.api.base)
    .filter(isUnsafeUrl)
    .join('\n'),
)

const isExampleLoaded = ref(false)
</script>

<template>
  <div class="unsafe-bypass-chrome-guide typo-style">
    <ol>
      <li>
        在浏览器的地址栏内输入<code>chrome://flags/#unsafely-treat-insecure-origin-as-secure</code>，进入 Chrome
        Experiments 页面；
      </li>
      <li>找到 Insecure origins treated as secure，并将其启用；</li>
      <li>将您在元数据源管理内填写的 API 地址填入到输入框内；</li>
      <li>重启浏览器。</li>
    </ol>
    <div class="bypass-example">
      <v-img
        ref="exampleImgElement"
        class="bypass-example__image border rounded-md"
        src="@/assets/images/guide/unsafe-bypass/chrome-flags-insecure-origins.webp"
        :aspect-ratio="1.277258566978193"
        @load="isExampleLoaded = true"
      >
        <transition name="fade-transition">
          <textarea
            v-if="isExampleLoaded"
            v-model="urls"
            class="bypass-example__content"
            :style="{ '--scale': exampleImageElementWidth / exampleImageWidth }"
            readonly
            spellcheck="false"
          >
          </textarea>
        </transition>
      </v-img>
      <div class="bypass-example__tip">Chrome Experiments 页面 可交互示例图</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.unsafe-bypass-chrome-guide {
  user-select: text;
}
img {
  max-width: 100%;
}
.bypass-example {
  width: 820px;
  max-width: 100%;
  position: relative;
  color-scheme: light;
  &__image {
    display: block;
  }
  &__content {
    display: block;
    position: absolute;
    padding: 8px;
    left: 7.3%;
    top: 62.6%;
    width: 542px;
    height: 122px;
    overflow-y: auto;
    font-size: 13px;
    transform: scale(var(--scale));
    transform-origin: 0 0;
    border-radius: 2px;
    font-family: monospace;
    color: darkgray;
    resize: none;
    line-height: normal;
  }
  &__tip {
    text-align: center;
    font-size: 0.75rem;
    opacity: var(--v-medium-emphasis-opacity);
  }
}
</style>
