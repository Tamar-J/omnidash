import { useRef } from 'react'
import { onlineManager, useQuery, useQueryClient } from '@tanstack/react-query'

import { AI_FEED_INSIGHT_KEY, getAiFeedTitlesBriefResponse } from '../services'

import { CachedAiChatDataProps } from '../types/CachedAiChatDataProps'
import { FeedArticleProps } from '@/features/feed/types'

export const useAiFeed = (feedArticles?: FeedArticleProps[] | null) => {
  const abortControllerRef = useRef<AbortController | null>(null)

  const aiFeedInsightData = useQueryClient().getQueryData<CachedAiChatDataProps>([AI_FEED_INSIGHT_KEY])

  const { data, refetch, isLoading, isError, isFetching } = useQuery({
    queryKey: [AI_FEED_INSIGHT_KEY],
    queryFn: async () => {
      try {
        if (!feedArticles) throw new Error('feed article is empty')

        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }

        const abortController = (abortControllerRef.current = new AbortController())

        const feedTitles = feedArticles.map(({ title }, index) => `${title} [${index}]`)
        const insightData = await getAiFeedTitlesBriefResponse(JSON.stringify(feedTitles), abortController.signal)
        return insightData
      } catch (error) {
        __DEV__ && console.error('Failed to fetch AI using Feed:', error)
        return aiFeedInsightData ? aiFeedInsightData : null
      }
    },
    staleTime: Infinity,
    retry: 3,
    retryDelay: 1000 * 30, // 30 seconds
    enabled: !aiFeedInsightData,
    subscribed: onlineManager.isOnline(),
  })

  return { data, refetch, isLoading, isError, isFetching }
}
