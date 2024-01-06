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

  converter = new showdown.Converter({
    extensions: [...bindings],
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
