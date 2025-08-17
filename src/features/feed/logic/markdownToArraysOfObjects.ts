import { extractYouTubeId } from '@/features/feed/utils'

import { MarkdownBlockProps } from '../types/MarkdownBlockProps'

export const convertMarkdownBlock = (markdownBlock: string): MarkdownBlockProps => {
  let processedBlock = markdownBlock
  processedBlock = processedBlock
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, charcode) => String.fromCharCode(charcode))
    .replace(/&nbsp;/g, ' ')

  const text = processedBlock.trim() || ''

  const isHeading = /^#{1,3} /g.test(text)

  if (isHeading) {
    const headingLevel = text.match(/^#+/)?.[0].length
    return { type: 'heading', level: headingLevel, text }
  }

  if (text.startsWith('* ')) return { type: 'list', text }

  if (text.startsWith('<!-- image')) {
    const {
      alt = '',
      src = '#',
      caption = '',
    } = text.match(/\[(?<alt>[\s\S]*?)\]\((?<src>https:\/\/(?:[^\s()\\]+|\([^\s()\\]*\))*)\)\s*(?<caption>.*)?/)?.groups || {
      alt: '',
      src: '#',
      caption: '',
    }

    const aspectRatio = parseFloat(text.match(/aspectRatio=([\d.]+)/)?.[1] || '')

    return { type: 'image', aspectRatio, src, alt, caption: caption.trim(), text: '' }
  }

  if (text.startsWith('<!-- video')) {
    const { link } = text.match(/\<!-- video: (?<link>[\s\S]*?) -->/)!.groups as { link: string }
    const videoId = extractYouTubeId(link)
    const videoLink = videoId ? `https://youtu.be/${videoId}` : ''
    const { alt = '', src = '#' } = text.match(/\[(?<alt>[\s\S]*?)\]\((?<src>[\s\S]*?)\)/)?.groups as {
      alt: string
      src: string
    }

    return { type: 'video', src, alt, link: videoLink, text: '' }
  }

  return { type: 'paragraph', text }
}

export function parseMarkdownToArrayOfObjects(markdownText: string) {
  const markdownBlocks = markdownText.split(/\n{2,}/g) || []
  return markdownBlocks.map((block) => convertMarkdownBlock(block))
}
