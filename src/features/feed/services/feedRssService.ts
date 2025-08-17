import { dayjs } from '@/libs/dayjs'
import { storage } from '@/libs/storage/storage'

import { FeedRawDataRss2Props, fetchRawFeedRss } from '../api/fetchRawFeedRss'

import { processFeedItem } from '../logic/feedProcessing'

import { FeedArticleProps, FeedSourcesProps } from '../types'

export const getFeedRssData = async (feed: FeedSourcesProps, cachedData: FeedArticleProps[] = []) => {
  const feedStorageKey = `feed.${feed.id}`
  const storedRawFeedData = storage.getItem<FeedRawDataRss2Props>(feedStorageKey)

  if (shouldUseCachedData(storedRawFeedData)) return cachedData

  const fetchedRawFeedData = await fetchRawFeedRss(feed.xmlUrl)

  __DEV__ && console.log('NEW FEED', feed.id)
  if (!fetchedRawFeedData) return cachedData
  if (!shouldUpdateFeedData(storedRawFeedData, fetchedRawFeedData)) return cachedData

  storage.setItem(feedStorageKey, { ...fetchedRawFeedData, lastFetchedAt: dayjs().utc(true) })
  const items = fetchedRawFeedData.rss?.channel?.item
  const faviconUrl = feed.favicon
  const siteName = fetchedRawFeedData.rss?.channel?.title || ''
  const language = feed.language || 'pt-BR'
  const rawRssItems =
    Array.isArray(items) ? items
    : items ? [items]
    : []

  const feedData = rawRssItems.reduce<FeedArticleProps[]>((acc, item) => {
    const processed = processFeedItem(item, faviconUrl, siteName, language)
    if (processed) acc.push(processed)
    return acc
  }, [])

  return feedData
}

function shouldUseCachedData(storedRawFeedData: FeedRawDataRss2Props | null) {
  const lastFetchedAt = storedRawFeedData?.lastFetchedAt
  return Boolean(lastFetchedAt) && dayjs().utc(true).diff(lastFetchedAt, 'hour') < 1
}

function shouldUpdateFeedData(storedRawFeedData: FeedRawDataRss2Props | null, fetchedRawFeedData: FeedRawDataRss2Props) {
  const oldBuildDate = storedRawFeedData?.rss?.channel?.lastBuildDate ?? null
  const newBuildDate = fetchedRawFeedData.rss?.channel?.lastBuildDate ?? null

  if (!newBuildDate) return true
  return oldBuildDate !== newBuildDate
}
