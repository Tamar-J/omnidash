import { useCallback, useMemo } from 'react'
import { useMMKVObject } from 'react-native-mmkv'
import { onlineManager, QueryFunctionContext, useQueries, UseQueryResult } from '@tanstack/react-query'

import { FEED_PROCESSED_KEY, FEED_SOURCES_KEY } from '@/libs/storage/storageKeys'

import { getFeedRssData } from '../services/feedRssService'

import { FeedArticleProps, FeedSourcesProps } from '../types'

type UseFeedRssProps = {
  articleType?: 'short-articles' | 'full-articles'
  numberOfArticles?: number
}

export const useAllFeedsRss = ({ articleType = 'full-articles', numberOfArticles }: UseFeedRssProps) => {
  const [allFeedSources = []] = useMMKVObject<FeedSourcesProps[]>(FEED_SOURCES_KEY)

  const filteredFeedSources = useMemo(() => {
    return allFeedSources.filter(({ isFullArticle }) => {
      return articleType === 'full-articles' ? isFullArticle : !isFullArticle
    })
  }, [allFeedSources, articleType])

  const combineFn = useCallback(
    (queryResults: UseQueryResult<FeedArticleProps[], Error>[]) => {
      const allArticles = queryResults.flatMap((feedResult) => feedResult.data || [])
      const articlesSortedByDate = [...allArticles].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      const shuffledArticles = [...articlesSortedByDate].sort(() => Math.random() - 0.5)
      const data = numberOfArticles ? shuffledArticles.slice(0, numberOfArticles) : articlesSortedByDate
      return {
        data,
        isPending: queryResults.some((result) => result.isPending),
      }
    },
    [numberOfArticles]
  )

  const { data } = useQueries({
    queries: filteredFeedSources.map((feed) => ({
      queryKey: [FEED_PROCESSED_KEY, articleType, feed.id],
      queryFn: async ({ queryKey, client }: QueryFunctionContext) => {
        const cachedData = await client.getQueryData<Promise<FeedArticleProps[]>>(queryKey)
        return await getFeedRssData(feed, cachedData)
      },
      enabled: !!feed.id && onlineManager.isOnline(),
      staleTime: 1000 * 60 * 60, //1h
    })),
    combine: combineFn,
  })

  return { data }
}
