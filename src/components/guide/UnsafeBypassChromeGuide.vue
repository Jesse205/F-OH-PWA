<script lang="ts" setup>
import { currentApiUrl } from '@/utils/url'
import { useElementSize } from '@vueuse/core'
import { ref } from 'vue'

const exampleImgElement = ref<HTMLImageElement>()
const { width: exampleImageElementWidth } = useElementSize(exampleImgElement)
const exampleImageWidth = 820

defineExpose({
  title: 'Chrome 解决 API 不安全',
})
</script>

<template>
  <div class="unsafe-bypass-chrome-guide typo-style">
    <ol>
      <li>
        在浏览器的地址栏内输入<code>chrome://flags/#unsafely-treat-insecure-origin-as-secure</code>，进入 Chrome
        Experiments 页面；
      </li>
      <li>找到 Insecure origins treated as secure，并将其启用；</li>
      <li>
        将 <code>{{ currentApiUrl }}</code> 填入到输入框内；
      </li>
      <li>重启浏览器。</li>
    </ol>
    <div class="bypass-example">
      <v-img
        ref="exampleImgElement"
        class="bypass-example__image border rounded-md"
        src="@/assets/images/guide/unsafe-bypass/chrome-flags-insecure-origins.svg"
        :aspect-ratio="1.277258566978193"
      />
      <span class="bypass-example__content">{{ currentApiUrl }}</span>
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
  &__image {
    display: block;
  }
  &__content {
    display: block;
    position: absolute;
    left: 9%;
    top: 63%;
    font-size: 13px;
    transform: scale(v-bind('exampleImageElementWidth/exampleImageWidth'));
    transform-origin: 0 0;
    font-family: monospace;
    color: darkgray;
  }
}
</style>
