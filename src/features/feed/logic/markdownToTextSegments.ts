export type markdownToTextSegmentsProps = {
  text: string
  link?: string | null
  isBold?: boolean
  isItalic?: boolean
  isTitle?: boolean
}

const markdownRegex =
  /((?<!\\)_\*\*.*?\*\*(?<!\\)_)|(\*\*(?<!\\)_.*?(?<!\\)_\*\*)|((?<!\\)_.*?(?<!\\)_)|(\*\*.*?\*\*)|(\[.*?\]\(.*?\))|(#+ .*)(?:\n|$)|^(\*\s)([\S]*$)/g

const expandNestedMarkdownStyles = (rawParts: string[]): string[] => {
  return rawParts.flatMap((part) => {
    const match = part.match(/^(?<start>_?\*\*|\*\*_|\*\*|_)(?<text>[^]+?)(?<end>\*\*_?|_?\*\*|\*\*|_)$/)

    if (!match?.groups) return part

    const { start, end } = match.groups
    const openTag = start.length <= end.length ? start : end
    const closeTag = openTag.split('').reverse().join('')
    const content = part.slice(openTag.length, -openTag.length)

    return content
      .split(markdownRegex)
      .filter(Boolean)
      .map((p) => `${openTag}${p}${closeTag}`)
  })
}

const parseLinkSegment = (markdownSegment: string): markdownToTextSegmentsProps | null => {
  const matchLinkParts = markdownSegment.match(/\[(.*?)\]\((.*?)\)/)
  if (!matchLinkParts) return null

  const [, text, link] = matchLinkParts
  const isBold = /(_?\*\*[^*]+?\*\*_?)/.test(markdownSegment)
  const isItalic = /(_.+?_)|(\*\*_.+?_\*\*)|(_\*\*.+?\*\*_)/.test(markdownSegment)

  return { text, link, isBold, isItalic }
}

const parseFormattedTextSegment = (text: string) => {
  let isBold = false
  let isItalic = false

  if ((text.startsWith('_**') && text.endsWith('**_')) || (text.startsWith('**_') && text.endsWith('_**'))) {
    isBold = true
    isItalic = true
    text = text.slice(3, -3)
  } else if (text.startsWith('**') && text.endsWith('**')) {
    isBold = true
    text = text.slice(2, -2)
  } else if (text.startsWith('_') && text.endsWith('_')) {
    isItalic = true
    text = text.slice(1, -1)
  }

  return { text, isBold, isItalic }
}

const parseTitleSegment = (markdownSegment: string): markdownToTextSegmentsProps | null => {
  if (!/^#+ /.test(markdownSegment)) return null

  return {
    text: markdownSegment.replace(/^#+ /, ''),
    isBold: true,
    isTitle: true,
  }
}

const parseBulletSegment = (markdownSegment: string): markdownToTextSegmentsProps | null => {
  if (!markdownSegment.startsWith('* ')) return null
  const text = markdownSegment.replace(/^\* /gm, '  • ')

  return { text }
}

const parseMarkdownSegment = (markdownSegment: string): markdownToTextSegmentsProps => {
  const textParsers = [parseLinkSegment, parseTitleSegment, parseBulletSegment]

  for (const parser of textParsers) {
    const textSegments = parser(markdownSegment)
    if (textSegments) return textSegments
  }

  const { text, isBold, isItalic } = parseFormattedTextSegment(markdownSegment)
  return { text, isBold, isItalic }
}

export const markdownToTextSegments = (markdownText: string): markdownToTextSegmentsProps[] => {
  if (!markdownText) return []

  const splittedMarkdown = markdownText.split(markdownRegex).filter(Boolean)
  const normalizedSegments = expandNestedMarkdownStyles(splittedMarkdown)

  return normalizedSegments.map(parseMarkdownSegment)
}
