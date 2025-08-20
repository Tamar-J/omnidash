import { renderCustomMarkdownBlocks } from './renderCustomMarkdownBlocks'

import { FeedArticleProps } from '../../types'

import { formatToLocaleHumanDate } from '@/utils'

export function useFeedArticleContent(data: FeedArticleProps) {
  const pubDate = formatToLocaleHumanDate(data.pubDate, data.language)
  const article = renderCustomMarkdownBlocks(data.articleContent)

  return {
    pubDate,
    article,
  }
}
