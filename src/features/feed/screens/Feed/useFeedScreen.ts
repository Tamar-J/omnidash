import { useNavigation } from '@react-navigation/native'

import { FeedArticleProps } from '../../types'

export function useFeedScreen() {
  const feedListData = [] as FeedArticleProps[]
  const feedCarouselData = [] as FeedArticleProps[]

  const { goBack } = useNavigation()

  const showArticle = (article: FeedArticleProps) => {
    __DEV__ && console.log('link:', article.link)
  }

  return {
    feedListData,
    feedCarouselData,
    goBack,
    showArticle,
  }
}
