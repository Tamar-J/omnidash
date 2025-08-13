import { Alert } from 'react-native'

import { fetchRawFeedRss, Rss2ChannelProps } from '../api/fetchRawFeedRss'
import { fetchFaviconUrl } from '../api/fetchFaviconUrl'

import { FeedSourcesProps } from '../types'

import { queryClient } from '@/libs/reactQuery/queryClient'
import { storage } from '@/libs/storage/storage'
import { FEED_PROCESSED_KEY, FEED_SOURCES_KEY } from '@/libs/storage/storageKeys'

const generateFeedIdFromXmlUrl = (feedUrl: string) => {
  try {
    const url = new URL(feedUrl)
    const hostname = url.hostname.replace('www.', '')
    const path = url.pathname
      .replace(/\/+/g, '/')
      .replace(/^\/|\/$/g, '')
      .replace(/\W+/g, '-')
      .toLowerCase()

    return path ? `${hostname}-${path}` : hostname
  } catch {
    return feedUrl.replace(/\W+/g, '-').toLowerCase()
  }
}

const buildFeedFromChannel = async (id: string, channel: Rss2ChannelProps, xmlUrl: string): Promise<FeedSourcesProps> => {
  return {
    id,
    xmlUrl,
    name: channel.title,
    description: channel.description,
    htmlUrl: channel.link,
    favicon: await fetchFaviconUrl(channel.link),
    language: channel.language ?? 'pt-BR',
    updatePeriod: channel['sy:updatePeriod'] ?? 'hourly',
    updateFrequency: Number(channel['sy:updateFrequency']) ?? 1,
    fetchedAt: new Date().toISOString(),
    isFullArticle: Boolean(Array.isArray(channel.item) && channel.item[0]['content:encoded']),
  }
}

export async function addFeedRssSourcesService(feedRssUrl: string) {
  const allFeeds = storage.getItem<FeedSourcesProps[]>(FEED_SOURCES_KEY) || []
  const feedId = generateFeedIdFromXmlUrl(feedRssUrl)
  const feedAlreadyAdded = allFeeds.some((feed) => feed.id === feedId)

  if (feedAlreadyAdded) return Alert.alert('Feed já adicionado')

  const fetchedFeed = await fetchRawFeedRss(feedRssUrl)
  if (fetchedFeed === null) return Alert.alert('URL inválida ou inatingível')

  const channel = fetchedFeed.rss?.channel
  if (!channel?.item) return Alert.alert('Feed inválido')

  const newFeed = await buildFeedFromChannel(feedId, channel, feedRssUrl)

  const updatedFeeds = [...allFeeds, newFeed]
  storage.setItem(FEED_SOURCES_KEY, updatedFeeds)

  queryClient.invalidateQueries({ queryKey: [FEED_PROCESSED_KEY] })
}
