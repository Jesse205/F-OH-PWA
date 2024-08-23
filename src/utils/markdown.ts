import showdown from 'showdown'

let converter: showdown.Converter
export function getShowdownConverter() {
  if (converter !== undefined) {
    return converter
  }
  const classMap: { [key: string]: string } = {
    h1: 'text-h6',
    h2: 'text-h6',
    h3: 'text-h6',
    h4: 'text-h6',
    h5: 'text-h6',
    h6: 'text-h6',
  }
  const bindings = Object.keys(classMap).map<showdown.ShowdownExtension>((key) => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`,
  }))

  const targetBlankExtension: showdown.ShowdownExtension = {
    type: 'output',
    regex: /<a (.+?)>/g,
    replace: '<a target="_blank" $1>',
  }

  converter = new showdown.Converter({
    extensions: [...bindings, targetBlankExtension],
    noHeaderId: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tables: true,
    ghCodeBlocks: true,
    tasklists: true,
    emoji: true,
    underline: true,
    ellipsis: true,
    moreStyling: true,
  })
  return converter
}

export function renderAnnouncement(content: string) {
  const converter = getShowdownConverter()
  let markdown = content.replaceAll(/@(.+)/g, '#### $1')
  // 替换日期
  markdown = markdown.replaceAll(/(\d{4}-\d{2}-\d{2})/g, '`$1`')
  // 替换版本
  markdown = markdown.replaceAll(/\b(v[.\d]+)\b/g, '`$1`')
  return converter.makeHtml(markdown)
}
