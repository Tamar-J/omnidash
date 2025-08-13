import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

import { dayjs } from '@/libs/dayjs'

export type Rss2ChannelProps = {
  title: string
  link: string
  description: string
  item: RssItem[] | RssItem
  language?: string
  'sy:updatePeriod'?: string
  'sy:updateFrequency'?: string
  lastBuildDate?: string
}

export type RssItem = {
  title?: string
  link?: string
  description?: string
  category?: string | string[]
  pubDate: string
  'dc:creator'?: string
  'content:encoded'?: string
}

export type FeedRawDataRss2Props = {
  rss?: {
    channel?: Rss2ChannelProps
    [key: string]: any
  }
  lastFetchedAt?: dayjs.Dayjs
}

export async function fetchRawFeedRss(xmlUrl: string): Promise<FeedRawDataRss2Props | null> {
  try {
    const response = await axios.get(xmlUrl, { responseType: 'text' })
    const parser = new XMLParser({ ignoreAttributes: false })
    return parser.parse(response.data)
  } catch (error) {
    __DEV__ && console.error(`Error fetching or parsing XML from feed:`, error)
    return null
  }
}
