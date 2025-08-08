import { FeedArticleProps } from './FeedArticleProps'

export type FeedCardProps = Pick<FeedArticleProps, 'title' | 'link' | 'faviconUrl' | 'siteName' | 'pubDate'> & {
  tags?: string[]
  maxTags?: number
}
