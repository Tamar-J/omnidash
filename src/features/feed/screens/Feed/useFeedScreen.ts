import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { useAllFeedsRss } from '../../hooks/useAllFeedsRss'
import { FeedArticleProps } from '../../types'

export function useFeedScreen() {
  const { data: feedListData = [] } = useAllFeedsRss({ articleType: 'short-articles' })
  const { data: feedCarouselData = [] } = useAllFeedsRss({ articleType: 'full-articles' })

  const { goBack } = useNavigation()

  const [isModalManageFeedSourcesVisible, setIsModalManageFeedSourcesVisible] = useState(false)

  const openModal = () => setIsModalManageFeedSourcesVisible(true)
  const closeModal = () => setIsModalManageFeedSourcesVisible(false)

  const showArticle = (article: FeedArticleProps) => {
    __DEV__ && console.log('link:', article.link)
  }

  return {
    feedListData,
    feedCarouselData,
    goBack,
    isModalManageFeedSourcesVisible,
    showArticle,
    openModal,
    closeModal,
  }
}
