export type FeedSourcesProps = {
  id: string
  name: string
  description: string
  xmlUrl: string
  htmlUrl: string
  favicon: string
  language: string
  updatePeriod: string //'hourly'
  updateFrequency: number
  fetchedAt: string
  isFullArticle: boolean
}
