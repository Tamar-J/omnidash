import { FeedArticleProps } from '@/features/feed/types'

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends HomeStackParamList {}
  }
}

export type HomeStackParamList = {
  home: undefined
  feed: undefined
  feedArticle: FeedArticleProps
}
