declare module '*.svg?raw' {
  const src: string[]
  export default src
}

declare module '*.svg?component' {
  import { FunctionalComponent, SVGAttributes } from 'vue'
  const src: FunctionalComponent<SVGAttributes>
  export default src
}

declare module '*.svg?vuetify' {
  const src: string[]
  export default src
}
