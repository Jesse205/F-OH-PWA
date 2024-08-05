/**
 * SVG 加载器
 * 可以加载为：
 * - `raw`：SVG 内容
 * - `component`：Vue 组件
 * - `vuetify`：Vuetify 的 `VSvgIcon` 的 `icon` 属性可以接受的值
 *
 * 改自 https://github.com/jpkleemans/vite-svg-loader/blob/main/index.js
 */
import fs from 'fs'
import { Config, optimize } from 'svgo'
import { PluginOption } from 'vite'
import { compileTemplate } from 'vue/compiler-sfc'
import { Element, xml2js } from 'xml-js'

type ImportType = 'raw' | 'component' | 'vuetify'

function findAndPushPaths(rootElement: Element, paths: string[]): string[] {
  if (!rootElement.elements) {
    return paths
  }
  for (const element of rootElement.elements) {
    if (element.type === 'element' && element.name === 'path' && element.attributes?.d !== undefined) {
      paths.push(String(element.attributes.d))
    } else if (element.type === 'element') {
      findAndPushPaths(element, paths)
    }
  }
  return paths
}

function findPaths(rootElement: Element): string[] {
  const paths: string[] = []
  findAndPushPaths(rootElement, paths)
  return paths
}

export default function svgLoader(options: { svgoConfig?: Config; svgo?: boolean } = {}): PluginOption {
  const { svgoConfig, svgo } = options

  const svgRegex = /\.svg\?(raw|component|vuetify)$/

  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load(id) {
      if (!id.match(svgRegex)) {
        return
      }

      const [path, query] = id.split('?', 2)

      const importType: ImportType | undefined = query as ImportType | undefined

      let svg
      svg = fs.readFileSync(path, 'utf-8')

      if (svgo !== false) {
        svg = optimize(svg, {
          ...svgoConfig,
          path,
        }).data
      }

      if (importType === 'raw') {
        return `export default ${JSON.stringify(svg)}`
      }

      if (importType === 'vuetify') {
        const svgJson = xml2js(svg) as Element
        return `export default ${JSON.stringify(findPaths(svgJson))}`
      }

      // To prevent compileTemplate from removing the style tag
      svg = svg.replace(/<style/g, '<component is="style"').replace(/<\/style/g, '</component')

      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: svg,
        filename: path,
        transformAssetUrls: false,
      })

      return `${code}\nexport default { render: render }`
    },
  }
}
