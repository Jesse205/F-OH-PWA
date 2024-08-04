import fs from 'fs'
import { Config, optimize } from 'svgo'
import { PluginOption } from 'vite'
import { compileTemplate } from 'vue/compiler-sfc'
import { Element, xml2js } from 'xml-js'

type ImportType = 'url' | 'raw' | 'component' | 'vuetify'

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

export default function svgLoader(
  options: { svgoConfig?: Config; svgo?: boolean; defaultImport?: ImportType } = {},
): PluginOption {
  const { svgoConfig, svgo, defaultImport } = options

  const svgRegex = /\.svg(\?(raw|component|vuetify))?$/

  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load(id) {
      if (!id.match(svgRegex)) {
        return
      }

      const [path, query] = id.split('?', 2)

      const importType: ImportType | undefined = (query || defaultImport) as ImportType | undefined

      if (importType === 'url' || importType === undefined) {
        return // Use default svg loader
      }

      let svg
      try {
        svg = fs.readFileSync(path, 'utf-8')
      } catch (ex) {
        // debug('\n', `${id} couldn't be loaded by vite-svg-loader, fallback to default loader`)
        return
      }
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
