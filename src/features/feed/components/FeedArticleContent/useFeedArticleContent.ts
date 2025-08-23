import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { renderCustomMarkdownBlocks } from './renderCustomMarkdownBlocks'

import { getAiFeedArticleBriefResponse } from '@/features/ai/services'

import { FeedArticleProps } from '../../types'

import { formatToLocaleHumanDate } from '@/utils'

export function useFeedArticleContent(data: FeedArticleProps) {
  const [articleBrief, setArticleBrief] = useState('')
  const [isLoadingArticleBrief, startTransition] = useTransition()

  const abortControllerRef = useRef<AbortController | null>(null)

  const pubDate = formatToLocaleHumanDate(data.pubDate, data.language)
  const article = renderCustomMarkdownBlocks(data.articleContent)
  const articleRawText = useMemo(() => data.articleContent.map(({ text }) => text).join(''), [data.articleContent])

  const handleGenerateBrief = () => {
    startTransition(async () => {
      const abortController = (abortControllerRef.current = new AbortController())
      try {
        const aiBrief = await getAiFeedArticleBriefResponse(articleRawText, abortController.signal)
        setArticleBrief(aiBrief)
      } catch (error) {
        __DEV__ && console.log(error)
      }
    })
  }

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  return {
    pubDate,
    article,
    articleBrief,
    isLoadingArticleBrief,
    handleGenerateBrief,
  }
}
