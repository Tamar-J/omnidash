import { MarkdownBlockProps } from './MarkdownBlockProps'

export type FeedArticleProps = {
  creator: string
  language: string
  title: string
  description?: string
  pubDate: string
  categories?: string[]
  image: MarkdownBlockProps | null
  link: string
  faviconUrl: string
  siteName: string
  articleContent: MarkdownBlockProps[]
}
