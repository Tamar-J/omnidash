import { htmlToCustomMarkdown } from './htmlToCustomMarkdown/htmlToCustomMarkdown'
import { parseMarkdownToArrayOfObjects } from './markdownToArraysOfObjects'
import { sanitizeHtml } from './htmlSanitizer/sanitizeHtml'

import { RssItem } from '../api/fetchRawFeedRss'
import { FeedArticleProps, MarkdownBlockProps } from '../types'

import { cleanImageUrl } from '@/utils'

export const processFeedItem = (
  item: RssItem,
  faviconUrl: string,
  siteName: string,
  language: string
): FeedArticleProps | null => {
  const hasContentEncoded = Boolean(item['content:encoded'])
  const rawContent = hasContentEncoded ? item['content:encoded'] : item.description
  if (!rawContent) return null

  const contentMarkdown = sanitizeAndConvertToMarkdown(rawContent)
  const title = sanitizeAndConvertToMarkdown(item.title ?? '')
  const articleContent = parseMarkdownToArrayOfObjects(contentMarkdown)
  const categories = typeof item.category === 'string' ? [item.category] : item.category
  const image = extractImageFromArticle(articleContent)
  const { pubDate, ['dc:creator']: creator = '', link = '' } = item

  const description = hasContentEncoded ? sanitizeAndConvertToMarkdown(item.description ?? '') : ''

  return {
    creator,
    language,
    faviconUrl,
    title,
    description,
    pubDate,
    categories,
    image,
    link,
    siteName,
    articleContent,
  }
}

function extractImageFromArticle(articleData: MarkdownBlockProps[]) {
  return (
    articleData.find(
      (article) =>
        (article.type === 'image' || article.type === 'video') && article.src && article.src === cleanImageUrl(article.src)
    ) ??
    articleData.find(
      (article) => (article.type === 'image' || article.type === 'video') && article.src && cleanImageUrl(article.src)
    ) ??
    null
  )
}

function sanitizeAndConvertToMarkdown(html: string): string {
  return htmlToCustomMarkdown(sanitizeHtml(html))
}
