import { MarkdownConversionContext } from './htmlToCustomMarkdown'

import { extractYouTubeId, escapeMarkdownCharacters } from '@/features/feed/utils'

export const openTagHandlers: Record<string, (attributes: Record<string, string>, context: MarkdownConversionContext) => void> = {
  div: (_, context) => {
    context.markdownParts.push('\n\n')
  },
  p: (_, context) => {
    context.isInsideParagraph = true
    context.markdownParts.push(' \n\n')
  },
  a: (attributes, context) => {
    if (attributes.href) {
      context.isInsideLink = true
      context.linkStartIndex = context.markdownParts.length
      context.openTagStack.push(attributes.href)
    }
  },
  h1: (_, context) => {
    context.markdownParts.push('\n\n# ')
  },
  h2: (_, context) => {
    context.markdownParts.push('\n\n## ')
  },
  h3: (_, context) => {
    context.markdownParts.push('\n\n### ')
  },
  img: (attributes, context) => {
    const fallbackImageUrl = attributes.src || ''
    let selectedImageUrl = fallbackImageUrl
    const minImageWidth = 500

    if (attributes.srcset) {
      const imageCandidates = (attributes.srcset.match(/(https:[^\s]+?)\s(\d+)w/g) || [])
        .map((entry) => {
          const [url, widthStr] = entry.trim().split(/\s+/)
          return {
            url,
            width: parseInt(widthStr.replace('w', ''), 10) || minImageWidth,
          }
        })
        .sort((a, b) => a.width - b.width)

      selectedImageUrl =
        imageCandidates.find((image) => image.width >= minImageWidth)?.url ||
        imageCandidates[imageCandidates.length - 1]?.url ||
        fallbackImageUrl
    }

    const altText = escapeMarkdownCharacters(attributes.alt || '')
    const width = Number(attributes.width)
    const height = Number(attributes.height)
    const hasValidDimensions = width > 0 && height > 0
    const DEFAULT_ASPECT_RATIO = 1.78
    const aspectRatio = hasValidDimensions ? Math.max(width, height) / Math.min(width, height) : DEFAULT_ASPECT_RATIO

    let caption = ''
    if (attributes['data-image-caption']) {
      const rawText = attributes['data-image-caption']
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .trim()

      caption = rawText.replace(/<[^>]*?>/g, '').trim()
    }

    const markdownImage = ` \n\n<!-- image:aspectRatio=${aspectRatio.toFixed(2)} -->\n![${altText}](${selectedImageUrl})`

    if (context.isInsideLink) {
      context.altImageTextForLink = altText
      context.markdownParts.splice(context.linkStartIndex, 0, markdownImage)
      context.linkStartIndex += 1
    } else {
      context.markdownParts.push(markdownImage + (caption ? `\n${caption}` : ''))
    }
  },

  table: (_, context) => {
    context.isInsideTable = true
    context.tableRows = []
  },
  tr: (_, context) => {
    if (context.isInsideTable) context.currentTableRow = []
  },
  td: (_, context) => {
    if (context.isInsideTable) {
      context.currentTableCellTag = 'td'
      context.tableCellContent = ''
    }
  },
  th: (_, context) => {
    if (context.isInsideTable) {
      context.currentTableCellTag = 'th'
      context.tableCellContent = ''
    }
  },
  ul: (_, context) => {
    context.openTagStack.push('ul')
    context.orderedListCounter = 1
  },
  ol: (_, context) => {
    context.openTagStack.push('ol')
    context.orderedListCounter = 1
  },
  li: (_, context) => {
    const parentTag = context.openTagStack.at(-1)
    const prefix = parentTag === 'ol' ? `${context.orderedListCounter++}. ` : '* '
    context.markdownParts.push('\n\n' + prefix)
  },

  strong: (_, context) => {
    context.markdownParts.push('**')
  },
  b: (_, context) => {
    context.markdownParts.push('**')
  },
  em: (_, context) => {
    context.markdownParts.push('_')
  },
  i: (_, context) => {
    context.markdownParts.push('_')
  },

  br: (_, context) => {
    context.markdownParts.push('\n')
  },

  iframe: (attributes, context) => {
    const videoId = extractYouTubeId(attributes.src || '')
    if (videoId) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      context.markdownParts.push(` \n\n<!-- video: ${attributes.src} -->\n![Video](${thumbnailUrl})\n\n`)
    }
  },
}
